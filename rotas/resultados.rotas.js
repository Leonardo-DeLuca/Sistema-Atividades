const express = require('express');
const { resultadosView, salvar, carregaLista } = require('../controller/ResultadosController');
const router = express.Router();

router.get('/', resultadosView);

router.post('/salvar', salvar);

router.get('/carregaLista', carregaLista);

module.exports = router;