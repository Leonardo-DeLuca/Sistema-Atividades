const express = require('express');
const { resultadosView } = require('../controller/ResultadosController');
const router = express.Router();

router.get('/resultados', resultadosView);

module.exports = router;