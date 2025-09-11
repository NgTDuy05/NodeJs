require('dotenv').config();
const express = require('express')
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web')

const app = express()
const port = process.env.PORT || 3001
const hostname = process.env.HOST_NAME


// console.log(">>> check env ", process.env);
// app.set('views', 'views')

// config template engine
configViewEngine(app);

app.use('/test', webRoutes);

app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})
