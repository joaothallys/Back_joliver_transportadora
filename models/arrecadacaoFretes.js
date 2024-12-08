const db = require('./db'); // Arquivo de conexão com o banco de dados

const getArrecadacaoFretes = (estadoId) => {
  const query = `
    SELECT 
    c.nome_cidade,
    e.nome_estado,
    COUNT(DISTINCT CASE WHEN f.id_remetente = c.id_cidade THEN f.id_frete END) AS quantidade_fretes_origem,
    COUNT(DISTINCT CASE WHEN f.id_destinatario = c.id_cidade THEN f.id_frete END) AS quantidade_fretes_destino
FROM Cidade c
JOIN Estado e ON c.id_estado = e.id_estado
LEFT JOIN Frete f ON f.id_remetente = c.id_cidade OR f.id_destinatario = c.id_cidade
WHERE e.id_estado = ? AND YEAR(f.data_frete) = 2024
GROUP BY c.id_cidade, e.nome_estado
  `;
  return db.query(query, [estadoId]); // Passando o estadoId como parâmetro
};

module.exports = { getArrecadacaoFretes };
