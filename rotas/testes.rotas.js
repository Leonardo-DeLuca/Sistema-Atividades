const express = require('express');
const { cadastroTestesView, listaTestesView } = require('../controller/TestesController');
const router = express.Router();

router.get('/cadastro_testes', cadastroTestesView);

router.get('/lista_testes', listaTestesView);

module.exports = router;