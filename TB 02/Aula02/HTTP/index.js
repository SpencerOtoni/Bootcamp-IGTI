import http from 'http'

http.createServer((req, res) =>{
  if((req.method === 'GET') && (req.url === '/teste')){
    res.write('GET /teste executando com sucesso')
  }else{
    res.write('Hello Word!')
  }

  res.statusCode = 200
  res.end()
}).listen(3333)