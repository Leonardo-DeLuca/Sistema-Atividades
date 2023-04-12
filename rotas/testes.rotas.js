const express = require('express');
const { listaTestesView, cadastroTestesView, salvar, carregaLista} = require('../controller/TestesController');
const router = express.Router();

router.get('/lista', listaTestesView);

router.get('/cadastro', cadastroTestesView);

router.post('/salvar', salvar);

router.get('/carregaLista', carregaLista)

module.exports = router;