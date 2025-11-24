const { Client } = require('@elastic/elasticsearch');

const esClient = new Client({
    node: `http://${process.env.ES_HOST || 'localhost'}:${process.env.ES_PORT || 9200}`
});

const initializeIndex = async () => {
    try {
        const exists = await esClient.indices.exists({ index: 'posts' });
        
        if (!exists) {
            await esClient.indices.create({
                index: 'posts',
                body: {
                    settings: {
                        number_of_shards: 2,
                        number_of_replicas: 0
                    },
                    mappings: {
                        properties: {
                            id: { type: 'integer' },
                            title: { type: 'text', fields: { keyword: { type: 'keyword' } } },
                            content: { type: 'text' },
                            categoryId: { type: 'integer' },
                            slug: { type: 'keyword' },
                            views: { type: 'integer' },
                            createdAt: { type: 'date' }
                        }
                    }
                }
            });
            console.log('✅ ES index created');
        }
    } catch (error) {
        console.error('❌ ES error:', error.message);
    }
};

initializeIndex();

module.exports = esClient;
