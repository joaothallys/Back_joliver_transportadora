// routes/mediaFretes.js
const express = require('express');
const router = express.Router();
const mediaFretesController = require('../controllers/mediaFretesController');

router.get('/:id_estado', mediaFretesController.getMediaFretes);

module.exports = router;
