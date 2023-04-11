const express = require('express');
const { testesView } = require('../controller/TestesController');
const router = express.Router();

router.get('/testes', testesView);

module.exports = router;