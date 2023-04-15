const express = require('express');
const { resultadosView, carregaLista } = require('../controller/ResultadosController');
const router = express.Router();

router.get('/', resultadosView);

router.get('/carregaLista', carregaLista)

module.exports = router;