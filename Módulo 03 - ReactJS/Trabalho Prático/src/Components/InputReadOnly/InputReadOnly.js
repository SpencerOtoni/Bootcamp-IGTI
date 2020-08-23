import React, { useState, useEffect } from "react";
import { calculateSalaryFrom } from "../../Libs/salary";
import { formatNumber } from '../../Libs/formatHelpers'

function InputReadOnly(props) {
  const { value } = props;

  const [infoSalary, setinfoSalary] = useState({});

  useEffect(() => {
    const data = calculateSalaryFrom(value);
    setinfoSalary({
      baseINSS: formatNumber(data.baseINSS),
      discountINSS: formatNumber(data.discountINSS),
      percetInss: data.percetInss,
      baseIRPF: formatNumber(data.baseIRPF),
      discountIRPF: formatNumber(data.discountIRPF),
      percetIRPF: data.percetIRPF,
      netSalary: formatNumber(data.netSalary),
      percetNetSalary : data.percetNetSalary
    });
  }, [value]);

  return (
    <div class="container">
      <div class="col s12">
        <div class="row">
          <div className="input-field col s3">
            <input
              disabled={true}
              value="0"
              type="text"
              id="first_name3"
              min="0"
              value={infoSalary.baseINSS}
            />
            <label className="active">Base INSS</label>
          </div>
          <div className="input-field col s3">
            <input
              disabled={true}
              value="10"
              type="text"
              id="first_name3"
              min="0"
              value={`${infoSalary.discountINSS} (${infoSalary.percetInss}%)`}
            />
            <label className="active">Desconto INSS</label>
          </div>
          <div className="input-field col s3">
            <input
              disabled={true}
              value="0"
              type="text"
              id="first_name3"
              min="0"
              value={infoSalary.baseIRPF}
            />
            <label className="active">Base IRPF</label>
          </div>
          <div className="input-field col s3">
            <input
              disabled={true}
              value="0"
              type="text"
              id="first_name3"
              min="0"
              value={`${infoSalary.discountIRPF} (${infoSalary.percetIRPF}%)`}
            />
            <label className="active">Desconto IRPF</label>
          </div>
        </div>
        <div class="row">
          <div class="container">
            <div className="input-field col s12">
              <input
                disabled={true}
                value="0"
                type="text"
                id="first_name3"
                min="0"
                value={`${infoSalary.netSalary} (${infoSalary.percetNetSalary}%)`}
              />
              <label className="active">Salário liquido</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputReadOnly;
