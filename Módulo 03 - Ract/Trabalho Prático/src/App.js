import React, {useState} from "react";
import Title from "./Components/Title/Title";
import InputFullSalary from "./Components/FullSalary/InputFullSalary";
import InputReadOnly from "./Components/InputReadOnly/InputReadOnly";


function App() {
  const [fullSalary, setFullSalary] = useState(0)
  
  function handleInput(value) {
    setFullSalary(value)
  }

  return(
    <>
    <Title title={"React Salário"} />
    <InputFullSalary value={fullSalary} onChangeFilter={handleInput} />
    <InputReadOnly value={fullSalary} />
    </>
  )

}

export default App;
