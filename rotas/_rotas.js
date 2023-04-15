const express = require('express');
const router = express.Router();

const rotasHome = require('./home.rotas');
const rotasLogin = require('./login.rotas');
const rotasResultados = require('./resultados.rotas');
const rotasTestes = require('./testes.rotas');

router.use('/', rotasHome);
router.use('/', rotasLogin);
router.use('/resultados', rotasResultados);
router.use('/testes', rotasTestes);

module.exports = router;