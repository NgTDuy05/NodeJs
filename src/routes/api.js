const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');

router.get('/health', (req, res) => {
    res.json({ status: 'ok', uptime: process.uptime() });
});

router.get('/posts', PostController.listPosts);
router.get('/posts/search', PostController.searchPosts);

module.exports = router;
