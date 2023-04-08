const express = require('express');
const router = express.Router();

const rotasHome = require('./home.rotas');
const rotasLogin = require('./login.rotas');

router.use('/', rotasHome);
router.use('/', rotasLogin);

module.exports = router;