import React from 'react'
import Installment from './Installment'

export default function Installments({installments, taxaJuros}) {
  
  return (
    <div className="row">
        {installments.map((installment, index) => {
          return (
            <Installment installment={installment} index={index} taxaJuros={taxaJuros}/>
          );
        })}
      </div>
  )
}


