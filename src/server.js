require('dotenv').config();
const express = require('express')
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web')
const mysql = require('mysql2')

const app = express()
const port = process.env.PORT || 3000



// console.log(">>> check env ", process.env);
// app.set('views', 'views')

// config template engine
configViewEngine(app);

app.use('/', webRoutes);


//test connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '123456',
    database: 'nguyenduy0512'
})
connection.query(
    'SELECT * FROM Users u',
    function (err, result, fields) {
        console.log(">>>result= ", result);
        console.log(">>>fields= ", fields);
    }
)

app.listen(3000, '0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`)
})
