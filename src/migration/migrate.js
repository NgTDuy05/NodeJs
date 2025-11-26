require('dotenv').config();
const mysql = require('mysql2/promise');

const createTables = async () => {
    let connection;
    
    try {
        // Tạo connection trực tiếp (không dùng pool)
        connection = await mysql.createConnection({
            host: '127.0.0.1',
            port: 3306,
            user: 'nodeuser',
            password: 'Ntd05#12',
            database: 'nodejs_db'
        });

        console.log('✅ Connected to MySQL');
        console.log('🔄 Migration starting...');
        
        await connection.execute('SET FOREIGN_KEY_CHECKS = 0');
        await connection.execute('DROP TABLE IF EXISTS Posts');
        await connection.execute('DROP TABLE IF EXISTS Categories');
        await connection.execute('SET FOREIGN_KEY_CHECKS = 1');
        console.log('✅ Old tables dropped');

        await connection.execute(`
            CREATE TABLE Categories (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                slug VARCHAR(255) UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_slug (slug)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);
        console.log('✅ Categories table created');

        await connection.execute(`
            CREATE TABLE Posts (
                id INT PRIMARY KEY AUTO_INCREMENT,
                category_id INT NOT NULL,
                title VARCHAR(500) NOT NULL,
                content TEXT NOT NULL,
                slug VARCHAR(500) UNIQUE NOT NULL,
                views INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_category (category_id),
                INDEX idx_slug (slug),
                INDEX idx_created (created_at),
                INDEX idx_views (views),
                FULLTEXT idx_fulltext (title, content),
                FOREIGN KEY (category_id) REFERENCES Categories(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);
        console.log('✅ Posts table created');

        console.log('✅ Migration completed successfully!');
        
    } catch (error) {
        console.error('❌ Migration error:', error.message);
        console.error('Error code:', error.code);
        throw error;
    } finally {
        if (connection) {
            await connection.end();
        }
        process.exit(0);
    }
};

createTables();
