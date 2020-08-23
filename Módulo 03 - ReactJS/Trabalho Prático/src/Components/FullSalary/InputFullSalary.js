import React from "react";

function InputFullSalary(props) {
  const { value, onChangeFilter } = props

  function handleSelectInput (event){
    const {  value } = event.target
    onChangeFilter(value)
  }
  
  return (
    <div class="container">
        <div className="input-field">
          <input
            type="number"
            id="first_name3"
            min="0"
            value={value}
            onChange={handleSelectInput}
          />
          <label className="active">Salário bruto</label>
        </div>
    </div>
  );
}

export default InputFullSalary;
