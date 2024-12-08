// models/fretesFuncionarios.js
const db = require('./db');  // Substitua com o arquivo de conexão do banco de dados

const getFretesFuncionarios = (mes, ano) => {
  const query = `
    SELECT 
  f.id_frete,
  f.data_frete,
  fj.razao_social AS empresa,
  pf.nome AS representante_nome,
  pf.telefone AS representante_telefone
FROM Frete f
JOIN Funcionario fu ON f.id_funcionario = fu.id_funcionario
JOIN Cliente cl ON f.id_destinatario = cl.id_cliente
JOIN PessoaJuridica fj ON cl.id_cliente = fj.id_cliente
LEFT JOIN PessoaFisica pf ON fj.id_representante = pf.id_cliente
WHERE MONTH(f.data_frete) = ? AND YEAR(f.data_frete) = ?
  `;
  return db.query(query, [mes, ano]);
};

module.exports = { getFretesFuncionarios };
