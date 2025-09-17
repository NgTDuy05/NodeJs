const express = require('express');
const router = express.Router();
const { getHomepage, getSample } = require('../controllers/homeController')

router.get('/', getHomepage);
router.get('/abc', getSample);

module.exports = router;