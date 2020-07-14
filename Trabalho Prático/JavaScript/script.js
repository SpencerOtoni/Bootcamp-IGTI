
let red = 0, green = 0, blue = 0

let rgb = document.querySelector('#rgb')

let inputRed = document.querySelector('#red')

let inputGreen = document.querySelector('#green')

let inputBlue = document.querySelector('#blue')

inputRed.addEventListener('input', (event)=>{
  const { value } = event.target

  red = value

  const camposRed = document.querySelectorAll('#valorR') 
  for(let i = 0; i < camposRed.length; i++){
    camposRed[i].innerHTML = value
  }

  rgb.style.backgroundColor = `rgb(${red},${green},${blue})`

})

inputGreen.addEventListener('input', (event)=>{

  const { value } = event.target

  green = value

  const camposGreen = document.querySelectorAll('#valorG') 
  for(let i = 0; i < camposGreen.length; i++){
    camposGreen[i].innerHTML = value
  }

  rgb.style.backgroundColor = `rgb(${red},${green},${blue})`

})


inputBlue.addEventListener('input', (event)=>{

  const { value } = event.target

  blue = value

  const camposBlue = document.querySelectorAll('#valorB') 
  for(let i = 0; i < camposBlue.length; i++){
    camposBlue[i].innerHTML = value
  }
  
  rgb.style.backgroundColor = `rgb(${red},${green},${blue})`

})