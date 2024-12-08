// models/arrecadacaoFretes.js
const db = require('./db');  // Substitua com o arquivo de conexão do banco de dados

const getArrecadacaoFretes = (estadoId) => {
  const query = `
    SELECT 
   c.nome_cidade,
   e.nome_estado,
   COUNT(f.id_frete) AS quantidade_de_frete,
   SUM(f.frete_valor) AS valor_total_arrecadado
FROM Frete f
JOIN Cidade c ON f.id_destinatario = c.id_cidade
JOIN Estado e ON c.id_estado = e.id_estado
WHERE e.id_estado = 1 AND YEAR(f.data_frete) = 2024
GROUP BY c.id_cidade, e.id_estado
  `;
  return db.query(query, [estadoId]);
};

module.exports = { getArrecadacaoFretes };
