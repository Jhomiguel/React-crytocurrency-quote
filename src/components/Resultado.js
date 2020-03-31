import React from "react";
import styled from "@emotion/styled";

const ResultadoDiv = styled.div`
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
`;
const Info = styled.p`
  font-size: 18px;
  span {
    font-weight: bold;
  }
`;

const Precio = styled.p`
  font-size: 30px;
`;
const Resultado = ({ cotizacion }) => {
  if (Object.keys(cotizacion).length === 0) return null;
  return (
    <ResultadoDiv>
      <Precio>
        Precio: <span>{cotizacion.PRICE}</span>
      </Precio>
      <Info>
        Precio mas alto del dia: <span>{cotizacion.HIGHDAY}</span>
      </Info>
      <Info>
        Precio mas bajo del dia: <span>{cotizacion.LOWDAY}</span>
      </Info>
      <Info>
        Ultima actualizacion: <span>{cotizacion.LASTUPDATE}</span>
      </Info>
      <Info>
        Variacion del precio en el dia:{" "}
        <span>{cotizacion.CHANGEPCT24HOUR}</span>
      </Info>
    </ResultadoDiv>
  );
};

export default Resultado;
