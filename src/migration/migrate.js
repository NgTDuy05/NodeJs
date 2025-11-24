require('dotenv').config();
const connection = require('../config/database');

const createTables = async () => {
    try {
        console.log('🔄 Migration starting...');
        
        await connection.execute('SET FOREIGN_KEY_CHECKS = 0');
        await connection.execute('DROP TABLE IF EXISTS Posts');
        await connection.execute('DROP TABLE IF EXISTS Categories');
        await connection.execute('SET FOREIGN_KEY_CHECKS = 1');

        await connection.execute(`
            CREATE TABLE Categories (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                slug VARCHAR(255) UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_slug (slug)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);

        await connection.execute(`
            CREATE TABLE Posts (
                id INT PRIMARY KEY AUTO_INCREMENT,
                category_id INT NOT NULL,
                title VARCHAR(500) NOT NULL,
                content TEXT NOT NULL,
                slug VARCHAR(500) UNIQUE NOT NULL,
                views INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_category (category_id),
                INDEX idx_slug (slug),
                FOREIGN KEY (category_id) REFERENCES Categories(id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);

        console.log('✅ Migration completed!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration error:', error);
        process.exit(1);
    }
};

createTables();
