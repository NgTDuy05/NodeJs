const mysql = require('mysql2/promise');

// Tạo connection trực tiếp thay vì dùng pool
const getConnection = async () => {
    return await mysql.createConnection({
        host: '127.0.0.1',
        port: 3306,
        user: 'nodeuser',
        password: 'Ntd05#12',
        database: 'nodejs_db'
    });
};

let getAllUsers = async () => {
    const connection = await getConnection();
    const [results] = await connection.query('SELECT * FROM Users');
    await connection.end();
    return results;
};

let createNewUser = async (email, name, city) => {
    const connection = await getConnection();
    await connection.query(
        'INSERT INTO Users(email, name, city) VALUES (?, ?, ?)',
        [email, name, city]
    );
    await connection.end();
};

let getUserById = async (userId) => {
    const connection = await getConnection();
    const [users] = await connection.query('SELECT * FROM Users WHERE id = ?', [userId]);
    await connection.end();
    return users[0];
};

let updateUserById = async (email, name, city, userId) => {
    const connection = await getConnection();
    await connection.query(
        'UPDATE Users SET email = ?, name = ?, city = ? WHERE id = ?',
        [email, name, city, userId]
    );
    await connection.end();
};

let deleteUserById = async (id) => {
    const connection = await getConnection();
    await connection.query('DELETE FROM Users WHERE id = ?', [id]);
    await connection.end();
};

module.exports = {
    getAllUsers,
    createNewUser,
    getUserById,
    updateUserById,
    deleteUserById
};
