import React, { useEffect, useState } from "react";
import { formatNumber } from "./Libs/formatHelpers";
import Ttile from "./components/Title";
import Form from "./components/Form";

export default function App() {
  const [capitalInicial, setCapitalinicial] = useState('');
  const [taxaJuros, setTaxaJuros] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [installments, setInstallments] = useState([]);
  const arryParcela = [];

  const classGoodValue = 'green-text darken-4';
  const classGoodPercent = 'blue-text darken-4';
  const classBadValue = 'red-text darken-4';
  const classBadPercent = 'orange-text darken-4';

  const classValue = taxaJuros > 0 ? classGoodValue : classBadValue;
  const classPercent = taxaJuros > 0 ? classGoodPercent : classBadPercent;

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
    <div className="container">
      <h1 className="center">React - Juros Composto</h1>
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

      <div className="row">
        {installments.map((installment, index) => {
          return (
            <div key={index} className="col s2">
              <div style={style.flexRow} className="card">
                <strong>{installment.index}</strong>
                <div style={style.flexCol}>
                  <span className={classValue}>{installment.montante}</span>
                  <span  className={classValue}>{installment.juros}</span>
                  <span className={classPercent}>{installment.percentJuros}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const style = {
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: "15px",
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
  },
};
