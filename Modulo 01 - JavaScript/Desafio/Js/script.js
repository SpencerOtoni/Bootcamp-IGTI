
let inputPesquisa = document.querySelector('#input_pesquisa')
let buttonPesquisa = document.querySelector('#button_pesquisa')
let allUser = []
let statistics = {
  userFemale : 0,
  userMale : 0, 
  sumAges : 0,
  middleAges : 0
}

let divStatistics = document.querySelector('.start')
let divDetailUser = document.querySelector('.detail')
let msgstart = document.querySelector('#start-message')

let totalWomen = document.querySelector('#women')
let totalMale = document.querySelector('#male')

let sumAge = document.querySelector('#sum-age')
let averageAge = document.querySelector('#average-age')

let numberFormat = null

async function start(){

  numberFormat = Intl.NumberFormat('pt-BR')

  await fetchUsers()

  inputPesquisa.addEventListener('keyup',(event)=>{
    const { value } = event.target
    if(value.length >= 1){
      userFilter(value.toLowerCase())
    }else{
      inputPesquisa.value = ''
      render()
      return
    }
  })
}

async function fetchUsers(){

  const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo')
  const json = await res.json()
  const { results } = json

  allUser = results.map(user => {
    const { name: { first, last }, picture: { large }, dob: { age }, gender } = user

    return{
      fullname: `${first} ${last}`.toLowerCase(),
      name: `${first} ${last}`,
      picture: large,
      age,
      gender
    }

  })
  .sort((a, b) =>{
    return a.fullname.localeCompare(b.fullname)
  })
  
}

function userFilter(name){

  

  const filteruser = allUser.filter(user => {
    return(
      user.fullname.includes(name)
    )
  })

  renderStatistics(filteruser)
  userDetails(filteruser)

}

function render (){
  
  divStatistics.innerHTML = ''
  divDetailUser.innerHTML = ''
  divStatistics.innerHTML = `<span id="start-message"> Para comerçamos, por 
  favor insira um nome. </span>`

}
function renderStatistics(users){

  if(users.length !==0){
    totalFemale = users.filter(user => {
      return user.gender === 'female'
    })
  
     totalMale = users.filter(user => {
      return user.gender === 'male'
    })
  
    totalAges = users.reduce((acc, cuur) =>{
      return acc + cuur.age
    },0)
  
    statistics.userFemale = totalFemale.length
    statistics.userMale = totalMale.length
    statistics.sumAges = formatNumber(totalAges)
    statistics.middleAges = (totalAges/users.length).toFixed(2)

    let statisticsHTML = `
    <div class="statistics">
      <h1>Estatísticas</h1>
      <span id="total-user"> Usuários encontrados: ${users.length} </span>
      <div class="statistic-data">
        <span id="women">Sexo masculino: ${statistics.userMale}</span>
        <span id="male">Sexo feminino: ${statistics.userFemale}</span>
      </div>
          
      <div class="statistic-data">
        <span id="sum-age">Soma das idades: ${statistics.sumAges}</span>
        <span id="average-age">Média das idades: ${statistics.middleAges}</span>
      </div>
    </div>
    `
    divStatistics.innerHTML = statisticsHTML
  }else{
    divStatistics.innerHTML = `
    '<div class="statistics">
      <span id="not-found">Não há resultados correspondentes a pesquisa.</span>
     </div>
    `
  }
 
}

function userDetails(users){

  let usersDetailHTML = `<div class="detail-user">`

  users.forEach(user => {
    const { name, picture, age } = user

    const userHTML = `
    <div class="usersDetail">
      <img src="${picture}" alt="${name}">
      <span>${name}, ${age}</span>
    </div>
    `

    usersDetailHTML += userHTML
  })

  usersDetailHTML += "</div>"

  divDetailUser.innerHTML = usersDetailHTML

}

function formatNumber(number){
  return numberFormat.format(number)
}

start()