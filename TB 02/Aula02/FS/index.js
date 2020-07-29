import {promises as fs} from 'fs'

//init()
writeReadJson()

async function writeReadJson(){
  try {
    const arrayCarros = ['Gol', 'Palio', 'Uno']
    const obj = {
      carros : arrayCarros
    }

    await fs.writeFile('teste.json', JSON.stringify(obj))
    const data = JSON.parse(await fs.readFile('teste.json'))
    data.carros.push('Sandero')

    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

async function init(){
  try {
    
    await fs.writeFile('teste.txt', 'bla bla bla')
    await fs.appendFile('teste.txt', '\nteste append file')
    const data = await fs.readFile('teste.txt', 'utf-8')
    console.log(data)
    
  } catch (error) {
    console.log(error)
  }
}

/*fs.writeFile('teste.txt', 'bla bla bla').then(() => {
  fs.appendFile('teste.txt', '\nteste apend file').then(()=>{
    fs.readFile('teste.txt', 'utf-8').then(resp =>{
      console.log(resp)
    }).catch(err =>{
      console.log(err)
    })
  }).catch(err =>{
    console.log(err)
  })
}).catch(err =>{
  console.log(err)
})*/


/* Utilizando callbacks
import fs from 'fs'

fs.writeFile('teste.txt', 'bababab', (err) =>{
  if(err){
    console.log(err)
  }else{
   fs.appendFile('teste.txt', '\nteste append file', (err) =>{
     if(err){
       console.log(err)
     }else{
      fs.readFile('teste.txt', 'utf-8' ,(err, data) =>{
        if(err){
          console.log(err)
        }else{
          console.log(data)
        }
      })
     }
   })
  }
})
*/
