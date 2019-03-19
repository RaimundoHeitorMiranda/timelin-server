var pool = require('./pool');
var bcrypt = require('bcrypt');

//LOGIN
const login = (request, response) => {
  const user = {email,senha} = request.body;

  // Procura o usário no bd
  pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
    // Em caso de erro..
    if (error) {
      response.status(400).send(error);

    // Se não encontrar no bd retorna um erro
    }else if(results.rows[0] == undefined){
      response.status(400).send("Senha ou email errados");

    // Se encontrar
    }else{
      // Compara as senhas
      bcrypt.compare(senha, results.rows[0].senha, function(err, res) {
        if(res) {
          // Se as senhas conferem envia o usuário logado como resposta
          delete results.rows[0].senha;
          response.status(200).json(results.rows[0]);
        } else {
           // Se não...
           response.status(400).send("Senha ou email errados");
        }
      });
    }
  })
}

//READ
const getUserById = (request, response) => {
  // Obtém o id
  const id = parseInt(request.params.id);

  // consulta no banco
  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      response.status(400).send(error);
    }
    response.status(200).json(results.rows);
  })
}

//CREATE
const createUser = (request, response) => {

  // extraindo dados do corpo da requisição
  const user = { nome, email, senha } = request.body;

  // verifica se o email já está cadastrado
  pool.query('SELECT * FROM users WHERE email = $1',[email], (error,results) =>{

    if(error){
      response.status(400).send(err);
    }

    if(results.rowCount>0){
      response.status(406).send(`Email já cadastrado`);
    }else{
      // criptografando senha
      bcrypt.hash(user.senha,10,(err,hash)=>{
         if(err){
           response.status(400).send(err);
         }else{
           pool.query('INSERT INTO users (nome, email,senha) VALUES ($1, $2, $3)', [nome, email,hash], (error, results) => {
             if (error) {
               response.status(400).send(error);
             }
             response.status(201).send(results.rows);
           })
         }
       });
    }

  })

}

//UPDATE
const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const user = { nome, email, senha } = request.body
  console.log("dados request",id,user)

  // Atualizando apenas nome e email
  if(senha == undefined){
    pool.query(
      'UPDATE users SET nome = $1, email = $2 WHERE id = $3',
      [nome, email,id],
      (error, results) => {
        console.log("result",results)
        if (error) {
          response.status(400).send(error);
        }
        response.status(200).json("Dados atualizados com sucesso");
      }
    )
  // Atualizando com senha
  }else{
    // criptografando senha
    bcrypt.hash(user.senha,10,(err,hash)=>{
       if(err){
         response.status(400).send(err);
       }else{
         pool.query(
           'UPDATE users SET nome = $1, email = $2,senha = $3 WHERE id = $4',
           [nome, email, hash, id],
           (error, results) => {
             if (error) {
               response.status(400).send(error);
             }
             response.status(200).json("Dados atualizados com sucesso");
           }
         )
       }
     });
  }
}

// DELETE
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      response.status(400).send(error);
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
}
