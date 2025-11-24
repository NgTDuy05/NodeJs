const connection = require('../config/database');
const redisClient = require('../config/redis');
const esClient = require('../config/elasticsearch');

class PostService {
    static async getPosts(page = 1, limit = 20) {
        const key = `posts:${page}:${limit}`;
        try {
            const cached = await redisClient.get(key);
            if (cached) {
                console.log('✅ Cache HIT');
                return JSON.parse(cached);
            }

            const offset = (page - 1) * limit;
            const [posts] = await connection.execute(
                'SELECT * FROM Posts ORDER BY created_at DESC LIMIT ? OFFSET ?',
                [limit, offset]
            );

            const [[{ total }]] = await connection.execute('SELECT COUNT(*) as total FROM Posts');
            const result = { posts, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };

            await redisClient.setEx(key, 300, JSON.stringify(result));
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async searchPosts(query, page = 1, limit = 20) {
        try {
            const result = await esClient.search({
                index: 'posts',
                body: {
                    from: (page - 1) * limit,
                    size: limit,
                    query: { multi_match: { query, fields: ['title^3', 'content'] } }
                }
            });

            const posts = result.hits.hits.map(hit => hit._source);
            return { posts, total: result.hits.total.value };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PostService;
