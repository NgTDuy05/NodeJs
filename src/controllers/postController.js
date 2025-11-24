const PostService = require('../services/PostService');

class PostController {
    static async listPosts(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const result = await PostService.getPosts(page, limit);
            return res.json({ success: true, data: result });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }

    static async searchPosts(req, res) {
        try {
            const { q, page = 1, limit = 20 } = req.query;
            if (!q) return res.status(400).json({ success: false, message: 'Query required' });
            
            const result = await PostService.searchPosts(q, parseInt(page), parseInt(limit));
            return res.json({ success: true, data: result });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }
}

module.exports = PostController;
