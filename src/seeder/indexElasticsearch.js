require('dotenv').config();
const connection = require('../config/database');
const esClient = require('../config/elasticsearch');

const indexPosts = async () => {
    try {
        console.log('🔍 Indexing to ES...');
        
        const BATCH = 1000;
        let offset = 0;
        let total = 0;

        while (true) {
            const [posts] = await connection.execute(
                'SELECT * FROM Posts LIMIT ? OFFSET ?',
                [BATCH, offset]
            );

            if (posts.length === 0) break;

            const body = posts.flatMap(p => [
                { index: { _index: 'posts', _id: p.id } },
                { id: p.id, title: p.title, content: p.content, categoryId: p.category_id, slug: p.slug, views: p.views, createdAt: p.created_at }
            ]);

            await esClient.bulk({ body });
            total += posts.length;
            offset += BATCH;
            console.log(`✅ Indexed ${total}`);
        }

        console.log('✅ Done!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

indexPosts();
