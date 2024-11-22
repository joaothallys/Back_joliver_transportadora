const express = require('express');
const router = express.Router();
const pessoaFisicaController = require('../controllers/pessoaFisicaController');

router.get('/', pessoaFisicaController.getAllPessoasFisicas);
router.get('/:id', pessoaFisicaController.getPessoaFisicaById);
router.post('/', pessoaFisicaController.createPessoaFisica);
router.put('/:id', pessoaFisicaController.updatePessoaFisica);
router.delete('/:id', pessoaFisicaController.deletePessoaFisica);

module.exports = router;
