// controllers/fretesFuncionariosController.js
const fretesFuncionariosModel = require('../models/fretesFuncionarios');

const getFretesFuncionarios = async (req, res) => {
  const { mes, ano } = req.params;
  
  // Validação simples de mês e ano
  if (isNaN(mes) || isNaN(ano) || mes < 1 || mes > 12 || ano < 1000 || ano > 9999) {
    return res.status(400).send("Parâmetros de mês ou ano inválidos.");
  }
  
  try {
    const results = await fretesFuncionariosModel.getFretesFuncionarios(mes, ano);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao consultar fretes atendidos por funcionários.");
  }
};

module.exports = { getFretesFuncionarios };
