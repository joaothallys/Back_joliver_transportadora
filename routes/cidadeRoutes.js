const express = require('express');
const router = express.Router();
const cidadeController = require('../controllers/cidadeController');

router.get('/', cidadeController.getAllCidades);
router.post('/', cidadeController.createCidade);
router.put('/:id', cidadeController.updateCidade);
router.delete('/:id', cidadeController.deleteCidade);
router.delete('/:id', cidadeController.deleteCidade);

module.exports = router;
