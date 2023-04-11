const express = require('express');
const { listaTestesView, cadastroTestesView, salvar } = require('../controller/TestesController');
const router = express.Router();

router.get('/lista', listaTestesView);

router.get('/cadastro', cadastroTestesView);

router.post('/salvar', salvar);

module.exports = router;