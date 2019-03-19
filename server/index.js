const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors');
const userDb = require('./queries/user-queries')
const acontecimentoDb = require('./queries/acontecimentos-queries')
const port =  process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// status do node
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
});

// login
app.post(   '/auth', userDb.login);

// controlles de um usuário
app.get(   '/users/:id', userDb.getUserById); // buscar por id
app.post(  '/users', userDb.createUser);      // adicionar
app.put(   '/users/:id', userDb.updateUser);  // atualizar
app.delete('/users/:id', userDb.deleteUser);  // deletar

// controle de um acontecimento
app.post(  '/acontecimento', acontecimentoDb.createAcontecimento); // adicionar
app.get(   '/acontecimento/:id', acontecimentoDb.getAcontecimentoById); // buscar
app.delete('/acontecimento/:id', acontecimentoDb.deleteAcontecimento); // deletar
app.get(   '/users/:userId/acontecimento', acontecimentoDb.getAllByUserId); //buscar todos

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});
