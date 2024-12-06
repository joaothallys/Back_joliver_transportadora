// models/arrecadacaoFretes.js
const db = require('./db');  // Substitua com o arquivo de conexão do banco de dados

const getArrecadacaoFretes = (estadoId) => {
  const query = `
    SELECT 
      c.nome_cidade,
      e.nome_estado,
      COUNT(f.id_frete) AS quantidade_fretes,
      SUM(f.frete_valor) AS valor_total_arrecadado
    FROM Frete f
    JOIN Cliente cl ON f.id_destinatario = cl.id_cliente
    JOIN Cidade c ON cl.id_cidade = c.id_cidade
    JOIN Estado e ON c.id_estado = e.id_estado
    WHERE e.id_estado = ? AND YEAR(f.data_frete) = 2024
    GROUP BY c.nome_cidade, e.nome_estado
  `;
  return db.query(query, [estadoId]);
};

module.exports = { getArrecadacaoFretes };
