var pool = require('./pool');
var bcrypt = require('bcrypt');

//LOGIN
const login = (request, response) => {

  // extrai os dados do corpo da requisição
  const user = {email,senha} = request.body;

  // procura o usário no bd
  pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
    // em caso de erro..
    if (error) {
      response.status(400).send(error);

    // se não encontrar no bd retorna um erro
    }else if(results.rows[0] == undefined){
      response.status(400).send("Senha ou email errados");

    // se encontrar
    }else{
      // compara as senhas
      bcrypt.compare(senha, results.rows[0].senha, function(err, res) {
        if(res) {
          // se as senhas conferem envia o usuário logado como resposta
          // mas antes remove o campo senha
          delete results.rows[0].senha;
          response.status(200).json(results.rows[0]);
        } else {
           // se não...
           response.status(400).send("Senha ou email errados");
        }
      });
    }
  })
}

//READ
const getUserById = (request, response) => {

  // obtém o id
  const id = parseInt(request.params.id);

  // consulta no banco
  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    // em caso de error
    if (error) {
      response.status(400).send(error);
    }
    // se não retorna os usuários
    response.status(200).json(results.rows);
  })
}

//CREATE
const createUser = (request, response) => {

  // extraindo dados do corpo da requisição
  const user = { nome, email, senha } = request.body;

  // verifica se o email já está cadastrado
  pool.query('SELECT * FROM users WHERE email = $1',[email], (error,results) =>{

    // se tiver envia o erro
    if(error){
      response.status(400).send(err);
    }

    // se já existir um email, retorna....
    if(results.rowCount>0){
      response.status(406).send(`Email já cadastrado`);
    // se não adiciona o usuário
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

  // extraindo dados da requisição
  const id = parseInt(request.params.id)
  const user = { nome, email, senha } = request.body

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
