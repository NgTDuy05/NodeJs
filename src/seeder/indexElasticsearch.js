require('dotenv').config();
const mysql = require('mysql2/promise');
const esClient = require('../config/elasticsearch');

const indexPosts = async () => {
    let connection;
    
    try {
        connection = await mysql.createConnection({
            host: '127.0.0.1',
            port: 3306,
            user: 'nodeuser',
            password: 'Ntd05#12',
            database: 'nodejs_db'
        });

        console.log('✅ Connected to MySQL');
        console.log('🔍 Starting Elasticsearch indexing...');
        
        const BATCH = 1000;
        let offset = 0;
        let total = 0;

        while (true) {
            const [posts] = await connection.query(
                'SELECT * FROM Posts LIMIT ? OFFSET ?',
                [BATCH, offset]
            );

            if (posts.length === 0) break;

            const body = posts.flatMap(p => [
                { index: { _index: 'posts', _id: p.id } },
                { 
                    id: p.id, 
                    title: p.title, 
                    content: p.content, 
                    categoryId: p.category_id, 
                    slug: p.slug, 
                    views: p.views, 
                    createdAt: p.created_at 
                }
            ]);

            await esClient.bulk({ body });
            total += posts.length;
            offset += BATCH;
            console.log(`✅ Indexed ${total} posts`);
        }

        console.log('✅ Indexing completed!');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        throw error;
    } finally {
        if (connection) await connection.end();
        process.exit(0);
    }
};

indexPosts();
