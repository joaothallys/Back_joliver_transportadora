// routes/fretesFuncionarios.js
const express = require('express');
const router = express.Router();
const fretesFuncionariosController = require('../controllers/fretesFuncionariosController');

router.get('/:mes/:ano', fretesFuncionariosController.getFretesFuncionarios);

module.exports = router;
