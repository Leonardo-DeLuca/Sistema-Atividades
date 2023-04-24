const express = require('express');
const router = express.Router();
const { loginView, registrar, login } = require('../controller/LoginController');

router.get('/', loginView);

router.post('/registrar', registrar);

router.post('/', login);

module.exports = router;