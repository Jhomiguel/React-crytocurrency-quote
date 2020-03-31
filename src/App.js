import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import imagen from "./criptomoneda.jpg";
import Formulario from "./components/Formulario";
import Resultado from "./components/Resultado";
import axios from "axios";
import Spinner from "./components/Spinner";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;
const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;
const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-bottom: 80px;
  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {
  //state para guardar el resultado de la moneda seleccionada
  const [moneda, guardarMoneda] = useState("");
  //state para guardar el resultado de la criptomoneda seleccionada
  const [criptomoneda, guardarCriptoMoneda] = useState("");
  //state para guardar el resultado de la cotizacion
  const [cotizacion, guardarCotizacion] = useState({});
  //state para mostrar el Spinner
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {
    const cotizarCriptoMoneda = async () => {
      //evitar la ejecucion por primera vez
      if (moneda === "") return;
      //consultar api para otener cotizacion
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const resultado = await axios.get(url);
      //mostrar spinner
      guardarCargando(true);
      setTimeout(() => {
        //ocultar spinner
        guardarCargando(false);
        //guardar cotizacion
        guardarCotizacion(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 3000);
    };
    cotizarCriptoMoneda();
  }, [moneda, criptomoneda]);

  //mostrar spinner o cotizacion
  const componente = cargando ? (
    <Spinner />
  ) : (
    <Resultado cotizacion={cotizacion} />
  );
  return (
    <Contenedor>
      <div>
        <Imagen img={imagen} alt="Cryptocurrency" />
      </div>
      <div>
        <Heading>Cotizador de criptomoneda</Heading>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCriptoMoneda={guardarCriptoMoneda}
        />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
