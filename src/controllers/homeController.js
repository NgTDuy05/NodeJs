const connection = require('../config/database');

const getHomepage = (req, res) => {
    // let users = [];

    // connection.query(
    //     'SELECT * FROM Users u',
    //     function (err, result, fields) {
    //         users = result;

    //         console.log(">>>check users = ", users);
    //         res.send(JSON.stringify(users))
    //     }
    // )
    return res.render('home.ejs');

}
const getSample = (req, res) => {
    res.render('sample.ejs')
}

const postCreateUser = (req, res) => {
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

    connection.query(
        'Select count(*) as count from Users where email = ?',
        [email],
        function (err, results) {
            if (err) {
                console.error('>>>error when checking email: ', err);
                return res.status(500).send('Error occurred');
            }
            if (results[0].count > 0) {
                return res.status(400).send('Email đã tồn tại!');
            }
            connection.query(

                `INSERT INTO Users(email, name, city) VALUES('${email}', '${name}', '${city}')`,
                function (err, result, fields) {
                    if (err) {
                        console.error('>>>error when inserting: ', err);
                        return res.status(500).send('Error occurred');
                    }
                    return res.send('post create user success!')
                }
            )
        }
    )
}
module.exports = {
    getHomepage,
    getSample,
    postCreateUser
}