const CRUDService = require('../services/CRUDService');

const getHomepage = async (req, res) => {
    let users = await CRUDService.getAllUsers();
    return res.render('home.ejs', { users });
}

const getSample = async (req, res) => {
    res.render('sample.ejs');
}

const postCreateUser = async (req, res) => {
    const { email, name, city } = req.body;

    // Kiểm tra kiểu dữ liệu email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).send('Email không hợp lệ!');
    }

    // Kiểm tra kiểu dữ liệu name và city (chỉ cho phép chữ cái, không số)
    const nameCityRegex = /^[A-Za-zÀ-ỹ\s]+$/;
    if (!nameCityRegex.test(name)) {
        return res.status(400).send('Tên không hợp lệ!');
    }
    if (!nameCityRegex.test(city)) {
        return res.status(400).send('Thành phố không hợp lệ!');
    }

    try {
        // Kiểm tra email trùng
        const emailExists = await CRUDService.isEmailExists(email);
        if (emailExists) {
            return res.status(400).send('Email đã tồn tại!');
        }
        // Thêm người dùng mới
        await CRUDService.createUser(email, name, city);
        return res.send('Đã tạo người dùng thành công!');
    } catch (err) {
        console.error('>>>error: ', err);
        return res.status(500).send('Error occurred');
    }
}

const getCreatePage = async (req, res) => {
    return res.render('create.ejs');
}

const getEditUser = async (req, res) => {
    const userId = req.params.id;
    if (!userId) {
        return res.send('User not found!');
    }
    const user = await CRUDService.getUserById(userId);
    if (!user) {
        return res.send('User not found!');
    }
    return res.render('edit.ejs', { user });
}
const postEditUser = async (req, res) => {
    const userId = req.params.id;
    const { email, name, city } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).send('Email không hợp lệ!');
    }
    const nameCityRegex = /^[A-Za-zÀ-ỹ\s]+$/;
    if (!nameCityRegex.test(name)) {
        return res.status(400).send('Tên không hợp lệ!');
    }
    if (!nameCityRegex.test(city)) {
        return res.status(400).send('Thành phố không hợp lệ!');
    }
    try {

        // kiem tra email trung
        const emailExists = await CRUDService.isEmailExists(email, userId);
        if (emailExists) {
            return res.status(400).send('Email đã tồn tại!');
        }
        await CRUDService.updateUser(userId, email, name, city);
        return res.redirect('/');
    } catch (err) {
        console.error('>>>error: ', err);
        return res.status(500).send('Error occurred');
    }
}

const postDeleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        await CRUDService.deleteUser(userId);
        return res.redirect('/');
    } catch (err) {
        console.error('>>>error: ', err);
        return res.status(500).send('Error occurred');
    }
}
module.exports = {
    getHomepage,
    getSample,
    postCreateUser,
    getCreatePage,
    getEditUser,
    postEditUser,
    postDeleteUser
}