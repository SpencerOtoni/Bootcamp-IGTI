
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

let totalWomen = document.querySelector('#women')
let totalMale = document.querySelector('#male')

let sumAge = document.querySelector('#sum-age')
let averageAge = document.querySelector('#average-age')

function start(){

  fetchUsers()

  inputPesquisa.addEventListener('keyup',(event)=>{
    const { value } = event.target

      if(value === '' || value === ' '){
        divStatistics.innerHTML = ''
        return
      }

    userFilter(value.toLowerCase())
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
      picture: large,
      age,
      gender
    }

  })
  .sort((a, b) =>{
    return a.fullname.localeCompare(b.fullname)
  })

  render()
  
}

function render(){
  userFilter()
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
    statistics.sumAges = totalAges
    statistics.middleAges = (statistics.sumAges/users.length).toFixed(2)

    let statisticsHTML = `
    <div class="statistics">
      <h1>Estatíticas</h1>
      <div class="statistic-data">
        <span id="women">Sexo masculino: ${statistics.userFemale}</span>
        <span id="male">Sexo feminino: ${statistics.userMale}</span>
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
        Não foram encontrados dados.
     </div>
    `
  }
 
}

function userDetails(users){

  if(users.length !==0){

    let usersDetailHTML = ` <div class="usersDetail">`

    users.forEach(user => {
      const { fullname, picture, age } = user

      const userHTML = `
        <img src="${picture}" alt="${fullname}">
        <span>{fullname}, {age}</span>
      </div>
      `

      usersDetailHTML += userHTML
    })

    usersDetailHTML += "</div>"

    divDetailUser.innerHTML = usersDetailHTML

  }

}


start()