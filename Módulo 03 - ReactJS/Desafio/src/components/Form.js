import React, { useEffect, useState } from "react";
import { formatNumber } from ".././Libs/formatHelpers";
import Installments from "./Installments";

export default function Form() {
  const [capitalInicial, setCapitalinicial] = useState("");
  const [taxaJuros, setTaxaJuros] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [installments, setInstallments] = useState([]);
  const arryParcela = [];

  useEffect(() => {
    for (let index = 0; index < periodo; index++) {
      const montante = calcJuroComp(
        capitalInicial,
        taxaJuros,
        index + 1
      ).toFixed(2);

      arryParcela.push({
        index: index + 1,
        montante: formatNumber(montante),
        juros: formatNumber((montante - capitalInicial).toFixed(2)),
        percentJuros: formatNumber(
          (((montante - capitalInicial) / capitalInicial) * 100).toFixed(2)
        ),
      });
    }

    setInstallments(arryParcela);
  }, [capitalInicial, taxaJuros, periodo]);

  function calcJuroComp(capitalInicial, taxaJuros, periodo) {
    return capitalInicial * Math.pow(1 + taxaJuros / 100, periodo);
  }

  return (
    <div>
      <div className="center">
        <div className="row">
          <div className="input-field col s4">
            <input
              id="capitalInicial"
              type="number"
              value={capitalInicial}
              onChange={({ target }) => {
                setCapitalinicial(target.value);
              }}
              min="0"
            />
            <label htmlFor="capitalInicial" className="active">
              Capital Inicial:
            </label>
          </div>
          <div className="input-field col s4">
            <input
              id="taxaJuros"
              type="number"
              step="0.1"
              min="-12"
              max="12"
              value={taxaJuros}
              onChange={({ target }) => {
                setTaxaJuros(target.value);
              }}
            />
            <label htmlFor="taxaJuros" className="active">
              Taxa de juros mensal:
            </label>
          </div>
          <div className="input-field col s4">
            <input
              id="periodo"
              type="number"
              min="1"
              max="36"
              value={periodo}
              onChange={({ target }) => {
                setPeriodo(target.value);
              }}
            />
            <label htmlFor="periodo" className="active">
              Período (meses):
            </label>
          </div>
        </div>
      </div>
      <Installments installments={installments} taxaJuros={taxaJuros}/>
    </div>
  );
}
