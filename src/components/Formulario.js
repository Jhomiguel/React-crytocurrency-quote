import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useMoneda from "../hooks/useMoneda";
import useCriptoMoneda from "../hooks/useCriptoMoneda";
import axios from "axios";
import Error from "./Error";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;
//                   estas funciones son del componente principal
const Formulario = ({ guardarCriptoMoneda, guardarMoneda }) => {
  //state del la lista de criptomonedas
  const [listacripto, guardarCriptoMonedas] = useState([]);
  //state de error
  const [error, guardarError] = useState(false);
  const MONEDAS = [
    { codigo: "DOP", nombre: "Peso dominicano" },
    { codigo: "MXN", nombre: "Peso mexicano" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "GBP", nombre: "Libra esterlina" },
    { codigo: "USD", nombre: "Dolar estadounidense" }
  ];
  //Utilizar useMoneda
  const [moneda, SeleccionarMoneda] = useMoneda(
    "Elige una moneda",
    "",
    MONEDAS
  );
  //Utilizar useCriptoMoneda
  const [criptomoneda, SeleccionarCriptoMoneda] = useCriptoMoneda(
    "Elige una Cripto Moneda",
    "",
    listacripto
  );

  //Ejecutar llamado a la API
  useEffect(() => {
    const ConsultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const resultado = await axios.get(url);
      guardarCriptoMonedas(resultado.data.Data);
    };
    ConsultarAPI();
  }, []);

  //Cuando el usuario hace submit
  const handleSubmit = e => {
    e.preventDefault();
    //validad si ambos campos estan llenos
    if (moneda === "" || criptomoneda === "") {
      guardarError(true);
      return;
    }
    //pasar datos al componente principal
    guardarError(false);
    guardarMoneda(moneda);
    guardarCriptoMoneda(criptomoneda);
  };
  return (
    <form onSubmit={handleSubmit}>
      {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
      <SeleccionarMoneda />
      <SeleccionarCriptoMoneda />

      <Boton type="submit" value="Calcular" />
    </form>
  );
};

export default Formulario;
