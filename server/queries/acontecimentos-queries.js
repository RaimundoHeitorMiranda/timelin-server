var pool = require('./pool');

//READ
const getAcontecimentoById = (request, response) => {

  // extraindo o id do acontecimento da requisição
  const id = parseInt(request.params.id)

  // consulta no banco
  pool.query('SELECT * FROM acontecimento WHERE id = $1', [id], (error, results) => {
    // em caso de erro
    if (error) {
      response.status(400).send(error);
    }
    // retorna o acontecimento
    response.status(200).json(results.rows)
  })
}

//READ ALL pelo usuário
const getAllByUserId = (request,response) =>{

  // extraindo dados da requisição
  const userId = parseInt(request.params.userId)

  // consulta no banco
  pool.query('SELECT * FROM acontecimento WHERE users_id = $1 ORDER BY data DESC',
   [userId], (error, results) => {
     // em caso de error
    if (error) {
      response.status(400).send(error);
    }
    // retorna todos os acontecimentos
    response.status(200).json(results.rows)
  })
}

//CREATE
const createAcontecimento = (request, response) => {

  // extraindo dados do corpo da requisição
  const acontecimento = { nome, descricao, data, cor , userId} = request.body

  // comando sql de insenão
  pool.query('INSERT INTO acontecimento (nome, descricao, data, cor, users_id) VALUES ($1, $2, $3, $4, $5)', [nome, descricao, data, cor, userId], (error, results) => {
    // em caso de erro..
    if (error) {
      response.status(400).send(error);
    }
    // retorna o resultado
    response.status(201).send(results.rows)
  })
}

// DELETE
const deleteAcontecimento = (request, response) => {

  // extraindo o id da requisição
  const id = parseInt(request.params.id)

  // comando sql
  pool.query('DELETE FROM acontecimento WHERE id = $1', [id], (error, results) => {
    // em caso de error
    if (error) {
      response.status(400).send(error);
    }
    // retorna o resultado
    response.status(200).send(results.rows)
  })
}

module.exports = {
  getAcontecimentoById,
  createAcontecimento,
  deleteAcontecimento,
  getAllByUserId
}
