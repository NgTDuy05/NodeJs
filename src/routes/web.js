const express = require('express');
const router = express.Router();
const { getHomepage, getSample, postCreateUser } = require('../controllers/homeController')

router.get('/', getHomepage);
router.get('/abc', getSample);
router.post('/create-users', postCreateUser);

module.exports = router;