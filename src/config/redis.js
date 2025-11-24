const redis = require('redis');

const client = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379
    }
});

client.on('error', (err) => console.error('❌ Redis Error:', err));
client.on('connect', () => console.log('✅ Redis Connected'));

(async () => {
    try {
        await client.connect();
        console.log('✅ Redis Ready');
    } catch (err) {
        console.error('❌ Redis failed:', err);
    }
})();

module.exports = client;
