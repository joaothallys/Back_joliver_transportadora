const express = require('express');
const router = express.Router();
const estadoController = require('../controllers/estadoController');


router.get('/', estadoController.getAllEstados);
router.get('/:id', estadoController.getEstadoById);
router.get('/nome/:nome', estadoController.getEstadoByName);
router.post('/', estadoController.createEstado);
router.delete('/:id', estadoController.deleteEstado);

module.exports = router;
