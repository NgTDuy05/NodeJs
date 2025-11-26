require('dotenv').config();
const mysql = require('mysql2/promise');
const { generateSlug } = require('../utils/slugGenerator');

const categories = ['Thời sự', 'Kinh tế', 'Thể thao', 'Giải trí', 'Công nghệ'];

const seedData = async () => {
    let connection;
    
    try {
        // Kết nối trực tiếp
        connection = await mysql.createConnection({
            host: '127.0.0.1',
            port: 3306,
            user: 'nodeuser',
            password: 'Ntd05#12',
            database: 'nodejs_db'
        });

        console.log('✅ Connected to MySQL');
        console.log('🌱 Seeding 10K posts...');

        // Insert categories
        for (let i = 0; i < categories.length; i++) {
            await connection.execute(
                'INSERT INTO Categories (name, slug) VALUES (?, ?)',
                [categories[i], generateSlug(categories[i])]
            );
        }
        console.log(`✅ ${categories.length} categories inserted`);

        // Insert posts
        const BATCH = 1000;
        for (let i = 0; i < 10000; i += BATCH) {
            const posts = [];
            for (let j = 0; j < BATCH; j++) {
                const idx = i + j + 1;
                const catId = Math.floor(Math.random() * 5) + 1;
                posts.push([
                    catId,
                    `Bài viết số ${idx} - ${categories[catId - 1]}`,
                    `Nội dung bài ${idx}. `.repeat(50),
                    generateSlug(`bai-viet-${idx}`, idx)
                ]);
            }
            await connection.query(
                'INSERT INTO Posts (category_id, title, content, slug) VALUES ?',
                [posts]
            );
            console.log(`✅ ${i + BATCH}/10000`);
        }

        console.log('✅ Seeding done!');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        throw error;
    } finally {
        if (connection) await connection.end();
        process.exit(0);
    }
};

seedData();
