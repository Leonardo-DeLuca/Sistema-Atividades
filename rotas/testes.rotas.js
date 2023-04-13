const express = require('express');
const { listaTestesView, cadastroTestesView, realizarTesteView, salvar, carregaLista, recuperar } = require('../controller/TestesController');
const router = express.Router();

router.get('/lista', listaTestesView);

router.get('/cadastro', cadastroTestesView);

router.get('/realizar', realizarTesteView);

router.post('/salvar', salvar);

router.get('/carregaLista', carregaLista);

router.get('/recuperar/:id', recuperar);

module.exports = router;