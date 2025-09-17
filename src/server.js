require('dotenv').config();
const express = require('express')
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web')

const app = express()
const port = process.env.PORT || 3000



// console.log(">>> check env ", process.env);
// app.set('views', 'views')

// config template engine
configViewEngine(app);

app.use('/', webRoutes);

app.listen(3000, '0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`)
})
