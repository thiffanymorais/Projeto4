"""
Ingestão de dados (ETL leve) com log e fallback para conjunto de demonstração.
Sem CSV versionados, o app permanece funcional para extensão / Streamlit Cloud.
"""
from __future__ import annotations

import logging
import sys

import numpy as np
import pandas as pd
import streamlit as st

from paths import DATA_DIR

logger = logging.getLogger("canolli360.etl")
if not logger.handlers:
    h = logging.StreamHandler(sys.stderr)
    h.setFormatter(logging.Formatter("%(levelname)s %(name)s: %(message)s"))
    logger.addHandler(h)
    logger.setLevel(logging.INFO)

_CSV_FILES: dict[str, str] = {
    "store": "STORE.csv",
    "customer": "CUSTOMER.CSV",
    "storeorder": "STOREORDER.csv",
    "customeraddress": "CUSTOMERADDRESS.CSV",
    "campaign": "CAMPAIGN.CSV",
    "campaignxorder": "CAMPAIGNxORDER.CSV",
}


def _ler_csv_seguro(caminho: str) -> pd.DataFrame | None:
    p = DATA_DIR / caminho
    try:
        if not p.is_file():
            logger.warning("Arquivo ausente: %s", p)
            return None
        df = pd.read_csv(p)
        logger.info("Carregado %s (%s linhas)", caminho, len(df))
        return df
    except Exception:
        logger.exception("Erro ao ler %s", p)
        return None


def _todos_csv_presentes() -> bool:
    return all((DATA_DIR / nome).is_file() for nome in _CSV_FILES.values())


def _gerar_demonstracao() -> dict[str, pd.DataFrame]:
    """Base sintética alinhada às colunas usadas no dashboard (sem dados reais)."""
    rng = np.random.default_rng(42)
    n_lojas = 10
    n_clientes = 800
    n_pedidos = 3500

    store = pd.DataFrame(
        {
            "id": np.arange(1, n_lojas + 1),
            "name": [f"Cozinha Piloto {i+1}" for i in range(n_lojas)],
        }
    )

    customer = pd.DataFrame(
        {
            "id": np.arange(1, n_clientes + 1),
            "status": rng.choice([0, 1], size=n_clientes, p=[0.12, 0.88]),
        }
    )

    customeraddress = pd.DataFrame(
        {
            "id": np.arange(1, n_clientes + 1),
            "customerid": np.arange(1, n_clientes + 1),
            "city": rng.choice(["São Paulo", "Campinas", "Curitiba"], n_clientes),
        }
    )

    t0 = pd.Timestamp("2023-01-01")
    datas = t0 + pd.to_timedelta(rng.integers(0, 500, size=n_pedidos), unit="D")
    status = rng.choice([16, 8, 11, 14, 6], size=n_pedidos, p=[0.72, 0.08, 0.06, 0.04, 0.10])

    storeorder = pd.DataFrame(
        {
            "id": np.arange(1, n_pedidos + 1),
            "storeid": rng.integers(1, n_lojas + 1, size=n_pedidos),
            "customerid": rng.integers(1, n_clientes + 1, size=n_pedidos),
            "status": status,
            "subtotalamount": rng.uniform(25, 180, n_pedidos).round(2),
            "discountamount": rng.uniform(0, 25, n_pedidos).round(2),
            "taxamount": rng.uniform(0, 8, n_pedidos).round(2),
            "totalamount": 0.0,
            "createdat": datas,
            "scheduledat": datas,
            "saleschannel": rng.choice(["app", "web", "balcão"], n_pedidos),
        }
    )
    storeorder["totalamount"] = (
        storeorder["subtotalamount"] - storeorder["discountamount"] + storeorder["taxamount"]
    ).round(2)

    camp_ids = np.array([101, 102, 103])
    n_cxo = 9000
    cxo_store = rng.integers(1, n_lojas + 1, size=n_cxo)
    cxo_camp = rng.choice(camp_ids, size=n_cxo)
    cxo_status = rng.choice([2, 4, 6], size=n_cxo, p=[0.55, 0.12, 0.33])

    campaignxorder = pd.DataFrame(
        {
            "campaignid": cxo_camp,
            "storeid": cxo_store,
            "message_id": np.arange(1, n_cxo + 1),
            "status": cxo_status,
            "order_id": rng.integers(1, n_pedidos + 1, size=n_cxo),
            "totalamount": rng.uniform(30, 200, n_cxo).round(2),
        }
    )

    rows = []
    for sid in range(1, n_lojas + 1):
        for tid in camp_ids:
            rows.append({"templateid": int(tid), "storeid": int(sid), "title": f"Campanha {tid}"})
    campaign = pd.DataFrame(rows)

    logger.warning("Usando dados de DEMONSTRAÇÃO (nenhum CSV encontrado em %s).", str(DATA_DIR))
    return {
        "store": store,
        "customer": customer,
        "storeorder": storeorder,
        "customeraddress": customeraddress,
        "campaign": campaign,
        "campaignxorder": campaignxorder,
    }


@st.cache_data(show_spinner=False)
def carregar_ou_demo() -> dict[str, pd.DataFrame]:
    if _todos_csv_presentes():
        out: dict[str, pd.DataFrame] = {}
        ok = True
        for chave, arquivo in _CSV_FILES.items():
            df = _ler_csv_seguro(arquivo)
            if df is None:
                st.error(f"❌ Falha ao carregar '{arquivo}' — caindo na demonstração.")
                ok = False
                break
            out[chave] = df
        if ok:
            return out

    return _gerar_demonstracao()