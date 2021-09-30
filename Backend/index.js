require('dotenv').config();
const express = require('express');
const db = require('./src/config/database');

const app = express();

db.connect();

app.get('/', function (req, res) {
    res.send('Đây là backend');
});

app.listen(process.env.PORT, function () {
    console.log('Your app running on port ' + process.env.PORT);
});
