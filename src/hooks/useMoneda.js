import React, { Fragment, useState } from "react";
import styled from "@emotion/styled";

const Label = styled.label`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  display: block;
  padding: 1rem;
  -webkit-appearance: none;
  border-radius: 10px;
  border: none;
  font-size: 1.8rem;
`;

const useMoneda = (label, stateInicial, opciones) => {
  const [state, ActualizarState] = useState(stateInicial);

  const Seleccionar = () => (
    <Fragment>
      <Label>{label}</Label>
      <Select value={state} onChange={e => ActualizarState(e.target.value)}>
        <option value="">--Seleccione una opcion--</option>
        {opciones.map(opciones => (
          <option key={opciones.codigo} value={opciones.codigo}>
            {opciones.nombre}
          </option>
        ))}
      </Select>
    </Fragment>
  );

  return [state, Seleccionar, ActualizarState];
};

export default useMoneda;
