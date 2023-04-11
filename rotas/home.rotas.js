const express = require('express');
const router = express.Router();
const { homeView } = require('../controller/HomeController');

router.get('/', homeView);
router.get('/home', homeView);

module.exports = router;