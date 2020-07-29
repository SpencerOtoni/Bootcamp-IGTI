import {promises as fs} from 'fs'

writeReadJson()

async function writeReadJson(){
  try {
    const ufs = JSON.parse(await fs.readFile('Estados.json'))
    const citys = JSON.parse(await fs.readFile('Cidades.json'))

    let arryCitys = []
    ufs.forEach(uf => {
      arryCitys = []
      citys.forEach(city =>{
        if(uf.ID === city.Estado){
          arryCitys.push(city)
        }
      })
      fs.writeFile(`${uf.Sigla}.json`, JSON.stringify({
        arryCitys
      }))
    });

    


    // await fs.writeFile('Estados.json', JSON.stringify(obj))
    
    // data.carros.push('Sandero')

    // console.log(data)
  } catch (error) {
    console.log(error)
  }
}