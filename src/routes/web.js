const express = require('express');
const router = express.Router();
const { getHomepage, getSample, postCreateUser, getCreatePage, getEditUser, postEditUser, postDeleteUser } = require('../controllers/homeController')

router.get('/', getHomepage);
router.get('/abc', getSample);
router.get('/create', getCreatePage);
router.get('/edit/:id', getEditUser);
router.post('/edit/:id', postEditUser);
router.post('/delete/:id', postDeleteUser);

router.post('/create-users', postCreateUser);

module.exports = router;