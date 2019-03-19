const Pool = require('pg').Pool

// Conectando ao banco,
// banco de dados postgresql fornecido pelo elephantsql.com
const pool = new Pool({
  user: 'dfxvmsiv',
  host: 'isilo.db.elephantsql.com',
  database: 'dfxvmsiv',
  password: 'VV64ohA3fhD19oa7dWq2QbK0wQckbKv2',
  port: 5432,
});

// Script de inicialização
pool.query(`

  create table if not exists users (
    id  int not null primary key,
    nome varchar(30),
    email varchar(30),
    senha varchar(60)
  );

  create table if not exists acontecimento (
    id int not null primary key,
    nome varchar(30),
    data timestamp,
    descricao text,
    cor varchar(8),
    users_id int references users(id)
  );

  create sequence if not exists users_id_seq;
  create sequence if not exists acontecimento_id_seq;

  alter	table	users
  		alter	column	id	set	default	nextval('users_id_seq');

  alter	table	acontecimento
  		alter	column	id	set	default	nextval('acontecimento_id_seq');

`);

module.exports = pool
