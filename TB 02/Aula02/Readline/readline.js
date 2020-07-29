import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

question()

function question(){
  rl.question('Digite um número: ', number => {

    if(parseInt(number) === -1){
      rl.close()
      return
    }

    const multiplos = []

    for (let index = 3; index < parseInt(number); index++) {
      if((index % 3 === 0 )|| (index % 5 === 0)){
        multiplos.push(index)
      }
    }

    console.log(multiplos)
    question()
  })
}