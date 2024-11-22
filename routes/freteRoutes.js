const express = require('express');
const router = express.Router();
const freteController = require('../controllers/freteController');

router.get('/', freteController.getAllFretes);
router.get('/:id', freteController.getFreteById);
router.post('/', freteController.createFrete);
router.put('/:id', freteController.updateFrete);
router.delete('/:id', freteController.deleteFrete);

module.exports = router;
