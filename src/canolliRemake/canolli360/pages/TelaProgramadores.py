import altair as alt
import numpy as np
import pandas as pd
import streamlit as st


#Graus	Radianos
#0°	        0
#90°	    π/2   
#180°	    π     
#270°	    3π/2  
#360°       2π    


ValorGraficoML=20

dados = pd.DataFrame({"ValorGraficoML": [ValorGraficoML]})

grafico=alt.Chart(dados).mark_arc(

    innerRadius=130, 
    outerRadius=150,
    color="#ff7a00"

    ).encode(
    theta=alt.value(-np.pi/2),  # Começa na esquerda (-90°)
    # Calcula dinamicamente o ponto de parada baseado no slider
    theta2=alt.value(-np.pi / 2 + (ValorGraficoML / 100) * np.pi)
).properties(
    width=300, height=500
)


grafico2=alt.Chart(dados).mark_arc(
    innerRadius=115, 
    outerRadius=165,
    color="#f2d4d5",

    ).encode(
    theta=alt.value(-np.pi/2),  # Começa na esquerda (-90°)
    # Calcula dinamicamente o ponto de parada baseado no slider
    theta2=alt.value(-np.pi/2 + (0.4 * np.pi))
).properties(
    width=300, height=500
)

grafico3=alt.Chart(dados).mark_arc(
    innerRadius=115, 
    outerRadius=165,
    color="#f0e6c2",
    

    ).encode(
    theta=alt.value(-np.pi/2 + (0.4 * np.pi)),
    # Calcula dinamicamente o ponto de parada baseado no slider
    theta2=alt.value(-np.pi/2 + (0.7 * np.pi))
).properties(
    width=300, height=500
)




grafico4=alt.Chart(dados).mark_arc(
    innerRadius=115, 
    outerRadius=165,
    color="#cae9de",

    ).encode(
    theta=alt.value(-np.pi/2 + (0.7 * np.pi)),
    # Calcula dinamicamente o ponto de parada baseado no slider
    theta2=alt.value(np.pi/2)
).properties(
    width=300, height=500
)


texto = alt.Chart(
        pd.DataFrame({
            "x":[0],
            "y":[0],
            "txt":[f"{ValorGraficoML}"]
        })


    ).mark_text(
        fontSize=30

    ).encode(
        x=alt.X("x", axis=None),
        y=alt.Y("y", axis=None),
        text="txt"
    )




grafico_final = texto + grafico2 + grafico3 + grafico4 + grafico 

st.altair_chart(grafico_final, use_container_width=True)