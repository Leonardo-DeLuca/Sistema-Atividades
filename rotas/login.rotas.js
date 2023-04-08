const express = require('express');
const router = express.Router();
const { loginView, registrar, login } = require('../controller/LoginController');

router.get('/login', loginView);

router.post('/registrar', registrar);

router.post('/login', login);

module.exports = router;