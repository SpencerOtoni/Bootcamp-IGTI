import {promises as fs} from 'fs'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

//writeReadJson()
async function writeReadJson(){
  try {
    const ufs = JSON.parse(await fs.readFile('Estados.json'))
    const citys = JSON.parse(await fs.readFile('Cidades.json'))

    let arryCitys = []
    for (const uf of ufs) {
      arryCitys = []
      for (const city of citys) {
        if(uf.ID === city.Estado){
          arryCitys.push(city.Nome)
        }
      }
      await fs.writeFile(`./estados-cidades/${uf.Sigla}.json`, JSON.stringify(arryCitys))
    }

    break
  } catch (error) {
    console.log(error)
  }
}

/**
 * Função que recebe um estado como parametro e
 * retornar o total de cidade do estado
 * Responsavel por invar as demais funções
 */
searchCities()
async function searchCities(){

  rl.question('Digite uma UF: ', async uf => {
    if(parseInt(uf) === -1){
      rl.close()
      return
    }

    let total = await totalCity(uf.toUpperCase())
    
    console.log(`Total de cidade do estado de ${uf.toUpperCase()} : ${total}`)

    cityByUF()
    biggestCityNameByUF()
    smallerCityNameByUF()
  })
  
}

/** 
 * Função que retorna total de cidade por estados
 * Invocada na pela cityByUF
 */
async function totalCity(uf){
  
  const ufSelect = JSON.parse(await fs.readFile(`./estados-cidades/${uf}.json`))
  return ufSelect.length

}

/** Função que monta o arry com todas as UF e o total de cidade
 *  Questão 02 
 */
async function cityByUF(){
  const ufs = JSON.parse(await fs.readFile('Estados.json'))
  const totalCityByUF = []

  for (const uf of ufs){
    let total = await totalCity(uf.Sigla)
    totalCityByUF.push({
      UF: uf.Sigla,
      total
    }) 
  }

  ufDesc(totalCityByUF)
  ufAsc(totalCityByUF)
}

/**
 * Função que orderna(desc) o arry recebido de estados e total de cidades
 * recebido por paramentro 
 * Invocada na função cityByUF
 * Questão 03 
 */
function ufDesc(arry){

  const arryUfDesc = arry.sort((a, b) =>{
    return b.total - a.total
  })
  
  console.log('Os cinco estados com mais cidades: ',
    arryUfDesc.slice(0,5))
}

/**
 * Função que orderna(asc) o arry recebido de estados e total de cidades
 * recebido por paramentro 
 * Invocada na função cityByUF
 * Questão 04
 */
function ufAsc(arry){

  const arryUfAsc = arry.sort((a, b) =>{
    return a.total - b.total
  })

  console.log('Os cinco estados com menos cidades: ',
    arryUfAsc.slice(0,5)
    )
}

/**
 * Função que retonar o maior nome de cidade de cada estado
 * Questão 05
 */
async function biggestCityNameByUF(){
  const ufs = JSON.parse(await fs.readFile('Estados.json'))

  const biggestName = []
  for (const uf of ufs){
    let cityUf = JSON.parse(await fs.readFile(`./estados-cidades/${uf.Sigla}.json`))
    let name = ''
    for (const city of cityUf) {
      if(name.length < city.length){
        name = city
      }
    }
    biggestName.push({
      UF: uf.Sigla,
      City: name
    })
  }

  console.log('Cidade de maior nome de cada estado: ',
    biggestName)

  biggestNameOfAllCities(biggestName)
}

/**
 * Função que retonar o menor nome de cidade de cada estado
 * Questão 06
 */
async function smallerCityNameByUF(){
  const ufs = JSON.parse(await fs.readFile('Estados.json'))

  const smallerName = []
  for (const uf of ufs){
    let cityUf = JSON.parse(await fs.readFile(`./estados-cidades/${uf.Sigla}.json`))
    let name = cityUf[0]
    for (const city of cityUf) {
      if(name.length > city.length){
        name = city
      }
    }
    smallerName.push({
      UF: uf.Sigla,
      City: name
    })
  }

  console.log('Cidade de menor nome de cada estado: ',
   smallerName)
   
  smallertNameOfAllCities(smallerName)
}

/**
 * Função que receber como paramentro o arry com os maiores nomes de 
 * cidade de cada estado
 * Invocada na função biggestCityNameByUF
 * Questão 07
 */
function biggestNameOfAllCities(arry){

  const arryUfAsc = arry.sort((a, b) =>{
    return a.City.localeCompare(b.City)
  })

  let biggestName = ''
  let result

  arryUfAsc.forEach(city => {
    if(biggestName.length < city.City.length){
      biggestName = city.City
      result = city
    }
  })

  console.log('O maior nome de cidade dentro todas os estados: ',
   result
  ) 
}

/**
 * Função que receber como paramentro o arry com os menores nomes de 
 * cidade de cada estado
 * Invocada na função biggestCityNameByUF
 * Questão 08
 */
function smallertNameOfAllCities(arry){

  const arryUfAsc = arry.sort((a, b) =>{
    return a.City.localeCompare(b.City)
  })

  let biggestName = arryUfAsc[0].City
  let result

  arryUfAsc.forEach(city => {
    if(biggestName.length > city.City.length){
      biggestName = city.City
      result = city
    }
  })

 console.log('O menor nome de cidade dentro todas os estados: '
  ,result
 ) 
}
