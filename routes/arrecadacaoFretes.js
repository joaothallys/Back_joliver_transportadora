// routes/arrecadacaoFretes.js
const express = require('express');
const router = express.Router();
const arrecadacaoFretesController = require('../controllers/arrecadacaoFretesController');

router.get('/:id_estado', arrecadacaoFretesController.getArrecadacaoFretes);

module.exports = router;
