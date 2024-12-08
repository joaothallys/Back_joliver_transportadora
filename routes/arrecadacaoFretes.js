const express = require('express');
const router = express.Router();
const arrecadacaoFretesController = require('../controllers/arrecadacaoFretesController');

// Definindo a rota para obter a arrecadação de fretes por estado
router.get('/:id_estado', arrecadacaoFretesController.getArrecadacaoFretes);

module.exports = router;
