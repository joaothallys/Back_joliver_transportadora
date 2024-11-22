const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Rota para listar todos os clientes
router.get('/', clienteController.getAllClientes);

// Rota para buscar um cliente por ID
router.get('/:id', clienteController.getClienteById);

// Rota para cadastrar um cliente
router.post('/', clienteController.createCliente);

// Rota para editar um cliente
router.put('/:id', clienteController.updateCliente);

// Rota para deletar um cliente
router.delete('/:id', clienteController.deleteCliente);

module.exports = router;
