// models/mediaFretes.js
const db = require('./db');  // Substitua com o arquivo de conexão do banco de dados

const getMediaFretes = (estadoId) => {
  const query = `
    SELECT 
      e.nome_estado,
      c.nome_cidade,
      AVG(origem.count_origem) AS media_fretes_origem,
      AVG(destino.count_destino) AS media_fretes_destino
    FROM Estado e
    JOIN Cidade c ON e.id_estado = c.id_estado
    LEFT JOIN (
      SELECT cl.id_cidade, COUNT(f.id_frete) AS count_origem
      FROM Frete f
      JOIN Cliente cl ON f.id_remetente = cl.id_cliente
      GROUP BY cl.id_cidade
    ) origem ON c.id_cidade = origem.id_cidade
    LEFT JOIN (
      SELECT cl.id_cidade, COUNT(f.id_frete) AS count_destino
      FROM Frete f
      JOIN Cliente cl ON f.id_destinatario = cl.id_cliente
      GROUP BY cl.id_cidade
    ) destino ON c.id_cidade = destino.id_cidade
    WHERE e.id_estado = ?
    GROUP BY e.nome_estado, c.nome_cidade
  `;
  return db.query(query, [estadoId]);
};

module.exports = { getMediaFretes };
