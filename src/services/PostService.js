const mysql = require('mysql2/promise');
const redisClient = require('../config/redis');
const esClient = require('../config/elasticsearch');

class PostService {
    // Tạo connection helper
    static async getConnection() {
        return await mysql.createConnection({
            host: '127.0.0.1',
            port: 3306,
            user: 'nodeuser',
            password: 'Ntd05#12',
            database: 'nodejs_db'
        });
    }

    static async getPosts(page = 1, limit = 20) {
        const key = `posts:${page}:${limit}`;
        try {
            const cached = await redisClient.get(key);
            if (cached) {
                console.log('✅ Cache HIT');
                return JSON.parse(cached);
            }

            const connection = await this.getConnection();
            const offset = (page - 1) * limit;
            const [posts] = await connection.query(
                'SELECT * FROM Posts ORDER BY created_at DESC LIMIT ? OFFSET ?',
                [limit, offset]
            );

            const [[{ total }]] = await connection.query('SELECT COUNT(*) as total FROM Posts');
            await connection.end();

            const result = { 
                posts, 
                pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } 
            };

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
