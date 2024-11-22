const express = require('express');
const router = express.Router();
const conhecimentoTransporteController = require('../controllers/conhecimentoTransporteController');

router.get('/', conhecimentoTransporteController.getAllConhecimentos);
router.get('/:id', conhecimentoTransporteController.getConhecimentoById);
router.post('/', conhecimentoTransporteController.createConhecimento);
router.put('/:id', conhecimentoTransporteController.updateConhecimento);
router.delete('/:id', conhecimentoTransporteController.deleteConhecimento);

module.exports = router;
