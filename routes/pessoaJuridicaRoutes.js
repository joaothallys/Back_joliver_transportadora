const express = require('express');
const router = express.Router();
const pessoaJuridicaController = require('../controllers/pessoaJuridicaController');

router.get('/', pessoaJuridicaController.getAllPessoasJuridicas);
router.get('/:id', pessoaJuridicaController.getPessoaJuridicaById);
router.post('/', pessoaJuridicaController.createPessoaJuridica);
router.put('/:id', pessoaJuridicaController.updatePessoaJuridica);
router.delete('/:id', pessoaJuridicaController.deletePessoaJuridica);

module.exports = router;
