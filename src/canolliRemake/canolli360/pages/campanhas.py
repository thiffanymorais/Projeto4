import html

import streamlit as st

st.set_page_config(
    page_title="Campanhas | Canolli360",
    layout="wide",
    initial_sidebar_state="expanded",
)

import etl
import funcs
import menu
from ui import dashboard_charts as dch
from ui.dashboard_theme import inject_executive_dashboard_css

inject_executive_dashboard_css()

st.session_state.menu_ativo = "Campanhas"

dados = etl.carregar_ou_demo()
store = dados["store"]
storeorder = dados["storeorder"]
campaign = dados["campaign"]
campaignxorder = dados["campaignxorder"]

periodo, restaurante, canal, pedido, df_loja = menu.render_header(store, storeorder)
menu.render_sidebar()

if restaurante != "Todas":
    map_store = dict(zip(store["name"], store["id"]))
    sid = map_store[restaurante]
    cxo_filtrado = campaignxorder[campaignxorder["storeid"] == sid].copy()
else:
    cxo_filtrado = campaignxorder.copy()

cxo_filtrado = funcs.filtrar_periodo(cxo_filtrado, periodo, "sent_at")

taxa, rec_conv, n_env, n_conv = funcs.taxa_conversao_campanha(cxo_filtrado)
lo, hi = funcs.wilson_ci(n_conv, n_env)

safe_loja = html.escape(str(restaurante))
safe_periodo = html.escape(str(periodo))

st.markdown(
    f"""
<div class="exec-hero">
  <h1>Campanhas e engajamento</h1>
  <div class="sub">Mensagens (status 2), conversões atribuídas (status 4) e receita vinculada — filtro do cabeçalho aplica-se às tabelas de campanha.</div>
  <div class="exec-pills">
    <span class="exec-pill brand">Parceiro: {safe_loja}</span>
    <span class="exec-pill">Período: {safe_periodo}</span>
  </div>
</div>
""",
    unsafe_allow_html=True,
)

m1, m2, m3, m4 = st.columns(4)
m1.metric("Mensagens enviadas (2)", f"{n_env:,}".replace(",", "."))
m2.metric("Conversões atribuídas (4)", f"{n_conv:,}".replace(",", "."))
m3.metric("Taxa de conversão", f"{taxa:.2f}%")
m4.metric("Receita atribuída (conv.)", funcs.formatar_moeda(rec_conv))

_nev = f"{n_env:,}".replace(",", ".")
_ncv = f"{n_conv:,}".replace(",", ".")
st.markdown(
    f"""
<div class="alert-strip">
  <strong>Intervalo Wilson (~95%)</strong> para a taxa de conversão:
  <strong>{lo:.2f}%</strong> a <strong>{hi:.2f}%</strong>
  (amostra: {_nev} mensagens; conversões observadas: {_ncv}).
</div>
""",
    unsafe_allow_html=True,
)

graf_a, graf_b = st.columns(2)
ranking = funcs.campanhas_por_loja(cxo_filtrado, campaign, store)
titulo_top = "Top parceiros — volume de mensagens"
if restaurante != "Todas":
    titulo_top = "Parceiro selecionado — distribuição interna (se houver)"

with graf_a:
    st.plotly_chart(
        dch.fig_campanhas_funil(int(n_env), int(n_conv)),
        use_container_width=True,
        key="camp_funil",
    )

with graf_b:
    st.plotly_chart(
        dch.fig_campanhas_top_parceiros(ranking, n=10, title=titulo_top),
        use_container_width=True,
        key="camp_top_lojas",
    )

with st.expander("Notas metodológicas (extensão FECAP)", expanded=False):
    st.markdown(
        """
- **Taxa de conversão**: razão entre mensagens com status **4** (conversão atribuída) e status **2** (enviadas), conforme regras do projeto.
- **Wilson**: intervalo para proporção binomial; útil quando o denominador é pequeno.
- **Gráfico de barras horizontais**: usa `campanhas_por_loja`; com um único parceiro no filtro, pode aparecer uma única barra.
"""
    )
