const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');

// Rotas de funcionários
router.get('/', funcionarioController.getAllFuncionarios);
router.get('/:id', funcionarioController.getFuncionarioById);
router.post('/', funcionarioController.createFuncionario);
router.put('/:id', funcionarioController.updateFuncionario);
router.delete('/:id', funcionarioController.deleteFuncionario);

module.exports = router;
