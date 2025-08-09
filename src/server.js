const express = require('express')
const path = require('path')
const app = express()
require('dotenv').config();

const port = process.env.PORT || 3001
const hostname = process.env.HOST_NAME


console.log(">>> check env ", process.env);

// config template engine
app.set('views', path.join(__dirname, 'views'));
// app.set('views', 'views')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/abc', (req, res) => {
    res.render('sample.ejs')
})

app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})
