const express = require('express');
const router = express.Router();
const { homeView } = require('../controller/HomeController');

router.get('/', homeView);

module.exports = router;