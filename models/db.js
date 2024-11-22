const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: 'junction.proxy.rlwy.net', // Host do banco
  user: 'root',                   // Usuário do banco
  password: 'GCbEkrlwyisinjijWxYFBEvfXQPvsgbo', // Senha do banco
  database: 'CMP1611',            // Nome do banco
  port: 41960,                    // Porta do banco
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection()
  .then(() => {
    console.log('Conectado ao banco de dados MySQL com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados MySQL:', err.message);
  });

module.exports = pool;
