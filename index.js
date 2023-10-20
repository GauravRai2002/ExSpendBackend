const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const PORT = 8000;


app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
    console.log('connected to mongoDb')
})

mongoose.connection.on('error', (error) => {
    console.log('Error : ' + error)
})

const Routes = require('./routes')

app.use(Routes)

app.get('/', (req, res) => {
    console.log('first')
    res.send({ 'status': 'Successful' })
})
app.listen(PORT, () => {
    console.log(`listening at port ${PORT}`)
})
