// controllers/mediaFretesController.js
const mediaFretesModel = require('../models/mediaFretes');

const getMediaFretes = async (req, res) => {
  const estadoId = req.params.id_estado;

  try {
    const results = await mediaFretesModel.getMediaFretes(estadoId);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao consultar dados de média de fretes.");
  }
};

module.exports = { getMediaFretes };
