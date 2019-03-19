const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var cors = require('cors');
const userDb = require('./queries/user-queries')
const acontecimentoDb = require('./queries/acontecimentos-queries')
const port = 3000

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// status do node
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

// login
app.post(   '/auth', userDb.login)

// controlles de um usuário
app.get(   '/users/:id', userDb.getUserById)
app.post(  '/users', userDb.createUser)
app.put(   '/users/:id', userDb.updateUser)
app.delete('/users/:id', userDb.deleteUser)

// controle de um acontecimento
app.post(  '/acontecimento', acontecimentoDb.createAcontecimento)
app.get(   '/acontecimento/:id', acontecimentoDb.getAcontecimentoById)
app.delete('/acontecimento/:id', acontecimentoDb.deleteAcontecimento)
app.get(   '/users/:userId/acontecimento', acontecimentoDb.getAllByUserId)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
