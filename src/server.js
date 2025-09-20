require('dotenv').config();
const express = require('express')
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web')
const connection = require('./config/database')
const app = express()
const port = process.env.PORT || 3000

//config req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// config template engine
configViewEngine(app);

app.use('/', webRoutes);

app.listen(3000, '0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`)
})
