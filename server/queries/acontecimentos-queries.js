var pool = require('./pool');

//READ
const getAcontecimentoById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM acontecimento WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//READ ALL BY User
const getAllByUserId = (request,response) =>{
  const userId = parseInt(request.params.userId)

  pool.query('SELECT * FROM acontecimento WHERE users_id = $1 ORDER BY data DESC',
   [userId], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//CREATE
const createAcontecimento = (request, response) => {

  // extraindo dados do corpo da requisição
  const acontecimento = { nome, descricao, data, cor , userId} = request.body

  pool.query('INSERT INTO acontecimento (nome, descricao, data, cor, users_id) VALUES ($1, $2, $3, $4, $5)', [nome, descricao, data, cor, userId], (error, results) => {
    if (error) {
      response.status(400).send(error);
    }
    response.status(201).send(results.rows)
  })
}

// DELETE
const deleteAcontecimento = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM acontecimento WHERE id = $1', [id], (error, results) => {
    if (error) {
      response.status(400).send(error);
    }
    response.status(200).send(results.rows)
  })
}

module.exports = {
  getAcontecimentoById,
  createAcontecimento,
  deleteAcontecimento,
  getAllByUserId
}
