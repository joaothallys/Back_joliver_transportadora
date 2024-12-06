// controllers/arrecadacaoFretesController.js
const arrecadacaoFretesModel = require('../models/arrecadacaoFretes');

const getArrecadacaoFretes = async (req, res) => {
  const estadoId = req.params.id_estado;
  
  try {
    const results = await arrecadacaoFretesModel.getArrecadacaoFretes(estadoId);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao consultar dados de arrecadação.");
  }
};

module.exports = { getArrecadacaoFretes };
