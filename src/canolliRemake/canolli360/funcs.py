import math
import altair as alt
import numpy as np
import pandas as pd
from paths import DATA_DIR, PACKAGE_DIR

# ==========================================
# 1. FUNÇÕES AUXILIARES E FILTROS
# ==========================================
def _calcular_inicio(data_max, periodo):
    """Calcula a data inicial com base no período selecionado."""
    if periodo == "Última semana":
        return data_max - pd.Timedelta(weeks=1)
    elif periodo == "Último mês":
        return data_max - pd.DateOffset(months=1)
    elif periodo == "Último bimestre":
        return data_max - pd.DateOffset(months=2)
    elif periodo == "Último trimestre":
        return data_max - pd.DateOffset(months=3)
    elif periodo == "Último semestre":
        return data_max - pd.DateOffset(months=6)
    elif periodo == "Último ano":
        return data_max - pd.DateOffset(years=1)
    return None


def filtrar_periodo(df, periodo, coluna_data='scheduledat'):
    """Filtra o DataFrame com base em uma coluna de data e um período."""
    df = df.copy()
    df[coluna_data] = pd.to_datetime(df[coluna_data], errors='coerce')

    data_max = df[coluna_data].max()
    inicio = _calcular_inicio(data_max, periodo)

    if inicio is None:
        return df

    return df[df[coluna_data] >= inicio]


def formatar_moeda(valor):
    """Formata um valor numérico para a string de moeda brasileira (R$)."""
    return f"R$ {valor:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")


# ==========================================
# 2. MÉTRICAS E CÁLCULOS DE VENDAS
# ==========================================
def receita_total(df):
    """Calcula a receita total para pedidos concluídos (status 16)."""
    return df[df['status'] == 16]['totalamount'].sum()


def total_pedidos(df):
    """Conta a quantidade de pedidos concluídos (status 16)."""
    return df[df['status'] == 16]['id'].count()


def ticket_medio(df, receita):
    """Calcula o ticket médio dos pedidos concluídos (status 16)."""
    df_16 = df[df['status'] == 16]
    quantidade = len(df_16)
    return receita / quantidade if quantidade > 0 else 0


def clientes_ativos(df_orders, df_customers, periodo):
    """Retorna o número de clientes ativos em um determinado período."""
    df_orders = filtrar_periodo(df_orders, periodo, 'createdat')
    clientes_ativos = df_customers[df_customers["status"] == 1]

    df_merge = df_orders.merge(
        clientes_ativos,
        left_on="customerid",
        right_on="id",
        how="inner"
    )
    return df_merge["customerid"].nunique()


def valor_per_mes(StoreOrder, periodo):
    """Agrupa a receita dos pedidos concluídos (status 16) por mês."""
    df = filtrar_periodo(StoreOrder, periodo, 'createdat')
  
    valor_por_mes = (
        df[df['status'] == 16]
        .set_index('createdat')
        .resample('ME')['totalamount']
        .sum()
        .reset_index()
    )
    return valor_por_mes


# ==========================================
# 3. CAMPANHAS E ENGAJAMENTO
# ==========================================

def campanhas_por_loja(campaignxorder, campaign, store):
    """Volume de mensagens de campanha por loja (para gráficos de engajamento)."""
    del campaign  # join opcional com tabela de campanha — métrica usa só pedidos x loja
    df = campaignxorder.merge(
        store[["id", "name"]],
        left_on="storeid",
        right_on="id",
        how="left",
    )
    return (
        df.groupby(["storeid", "name"], as_index=False)["message_id"]
        .count()
        .rename(columns={"message_id": "qtd_mensagens"})
        .sort_values("qtd_mensagens", ascending=False)
    )


def taxa_conversao_campanha(campaignxorder: pd.DataFrame) -> tuple[float, float, int, int]:
    """Taxa de conversão mensagens enviadas (status 2) → conversão atribuída (status 4)."""
    env = campaignxorder[campaignxorder["status"] == 2]
    conv = campaignxorder[campaignxorder["status"] == 4]
    
    n_env = len(env)
    n_conv = len(conv)
    
    taxa = (n_conv / n_env * 100) if n_env else 0.0
    rec_conv = float(conv["totalamount"].sum()) if n_conv else 0.0
    
    return taxa, rec_conv, n_env, n_conv


def wilson_ci(successes: int, n: int, z: float = 1.96) -> tuple[float, float]:
    """Limites inferiores e superiores (~95%) da taxa de conversão em %."""
    if n <= 0:
        return (0.0, 0.0)
        
    p = successes / n
    denom = 1 + z**2 / n
    centre = (p + z**2 / (2 * n)) / denom
    rad = z * math.sqrt((p * (1 - p) + z**2 / (4 * n)) / n) / denom
    
    return max(0.0, (centre - rad) * 100), min(100.0, (centre + rad) * 100)


# ==========================================
# 4. ANÁLISE AVANÇADA (RFM) E GRÁFICOS
# ==========================================

def calcular_rfm(storeorder: pd.DataFrame, periodo: str, store: pd.DataFrame) -> pd.DataFrame:
    """RFM (Recência, Frequência, Valor) em pedidos concluídos (status 16).

    Inclui o nome do parceiro (loja) conforme o último pedido concluído do cliente no recorte.
    """
    df = filtrar_periodo(storeorder.copy(), periodo, "createdat")
    df = df[df["status"] == 16].copy()
    df["createdat"] = pd.to_datetime(df["createdat"], errors="coerce")
    
    ref = df["createdat"].max()
    if pd.isna(ref) or df.empty:
        return pd.DataFrame(
            columns=[
                "customerid", "parceiro", "recencia_dias", "frequencia", 
                "valor", "R", "F", "M", "segmento"
            ]
        )

    if store is not None and not store.empty and "id" in store.columns and "name" in store.columns:
        lojas = store[["id", "name"]].drop_duplicates(subset=["id"]).copy()
        lojas["_sk"] = lojas["id"].astype(str)
        df["_sk"] = df["storeid"].astype(str)
        df = df.merge(lojas[["_sk", "name"]], on="_sk", how="left").rename(columns={"name": "_parceiro"})
        df = df.drop(columns=["_sk"], errors="ignore")
        df["_parceiro"] = df["_parceiro"].fillna("—")
    else:
        df["_parceiro"] = "—"

    # Nome do parceiro = loja do último pedido concluído (maior data) no período filtrado
    ult = df.sort_values(["customerid", "createdat"]).groupby("customerid").tail(1)
    mapa_parceiro = ult.set_index("customerid")["_parceiro"]

    g = (
        df.groupby("customerid", as_index=False)
        .agg(
            recencia_dias=(
                "createdat",
                lambda s: int((ref - s.max()).days) if pd.notna(s.max()) else np.nan
            ),
            frequencia=("id", "count"),
            valor=("totalamount", "sum"),
        )
    )
    g["parceiro"] = g["customerid"].map(mapa_parceiro).fillna("—")

    def _qcut_safe(serie: pd.Series, labels: list[int]) -> pd.Series:
        s = serie.astype(float)
        if len(s) < 5 or s.nunique() < 2:
            return pd.Series(3, index=s.index, dtype="int64")

        try:
            q = pd.qcut(s, 5, labels=labels, duplicates="drop")
            return q.fillna(3).astype(int)
        except ValueError:
            return pd.Series(3, index=s.index, dtype="int64")

    # Menos dias desde a última compra = melhor recência (nota 5 no primeiro quintil).
    g["R"] = _qcut_safe(g["recencia_dias"], [5, 4, 3, 2, 1])
    g["F"] = _qcut_safe(g["frequencia"], [1, 2, 3, 4, 5])
    g["M"] = _qcut_safe(g["valor"], [1, 2, 3, 4, 5])

    def _segmento(row) -> str:
        r, f = int(row["R"]), int(row["F"])
        if r >= 4 and f >= 4:
            return "Campeões"
        if r <= 2 and f >= 3:
            return "Em risco"
        if r <= 2 and f <= 2:
            return "Hibernando / churn"
        if f >= 3:
            return "Leais"
        return "Oportunidade"

    g["segmento"] = g.apply(_segmento, axis=1)
    return g

