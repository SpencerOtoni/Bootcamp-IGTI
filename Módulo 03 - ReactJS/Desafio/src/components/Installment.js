import React from "react";

export default function Installment({ installment, index, taxaJuros }) {
  const classGoodValue = "green-text darken-4";
  const classGoodPercent = "blue-text darken-4";
  const classBadValue = "red-text darken-4";
  const classBadPercent = "orange-text darken-4";

  const classValue = taxaJuros > 0 ? classGoodValue : classBadValue;
  const classPercent = taxaJuros > 0 ? classGoodPercent : classBadPercent;

  return (
    <div key={index} className="col s2">
      <div style={style.flexRow} className="card">
        <strong>{installment.index}</strong>
        <div style={style.flexCol}>
          <span className={classValue}>{installment.montante}</span>
          <span className={classValue}>{installment.juros}</span>
          <span className={classPercent}>{installment.percentJuros}%</span>
        </div>
      </div>
    </div>
  );
}

const style = {
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
  },
};
