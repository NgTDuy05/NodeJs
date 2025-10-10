
const connection = require('../config/database');

const getAllUsers = async () => {
    let [users] = await connection.execute('SELECT * FROM Users');
    return users;
}

const createUser = async (email, name, city) => {
    await connection.execute(
        'INSERT INTO Users(email, name, city) VALUES(?, ?, ?)',
        [email, name, city]
    );
}

const isEmailExists = async (email, excludeID) => {
    let query = 'SELECT COUNT(*) as count FROM Users WHERE email = ?';
    let params = [email];
    if (excludeID) {
        query += ' AND id != ?';
        params.push(excludeID);
    }
    const [results] = await connection.execute(query, params);
    return results[0].count > 0;
}

const getUserById = async (id) => {
    const [user] = await connection.execute(
        'SELECT * FROM Users WHERE id = ?',
        [id]
    );
    return user[0];
}

const updateUser = async (id, email, name, city) => {
    await connection.execute(
        'UPDATE Users SET email = ?, name = ?, city = ? WHERE id = ?',
        [email, name, city, id]
    );
}

const deleteUser = async (id) => {
    await connection.execute(
        'DELETE FROM Users WHERE id = ?',
        [id]
    );
}
module.exports = {
    getAllUsers,
    createUser,
    isEmailExists,
    getUserById,
    updateUser,
    deleteUser
}