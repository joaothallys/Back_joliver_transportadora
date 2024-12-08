const arrecadacaoFretesModel = require('../models/arrecadacaoFretes');

// Função para obter os dados de arrecadação de fretes
const getArrecadacaoFretes = async (req, res) => {
  const estadoId = req.params.id_estado;

  try {
    // Chama o método do modelo que retorna uma promise
    const results = await arrecadacaoFretesModel.getArrecadacaoFretes(estadoId);
    res.json(results);
  } catch (error) {
    console.error('Erro ao consultar dados de arrecadação:', error);
    res.status(500).send('Erro ao consultar dados de arrecadação.');
  }
};

module.exports = { getArrecadacaoFretes };
