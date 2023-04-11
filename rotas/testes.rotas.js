const express = require('express');
const { listaTestesView, cadastroTestesView, salvar } = require('../controller/TestesController');
const router = express.Router();

router.get('/listar', listaTestesView);

router.get('/cadastro', cadastroTestesView);

router.post('/salvar', salvar);

module.exports = router;