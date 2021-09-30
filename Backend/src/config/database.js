require('dotenv').config();
const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);

const connect = () => {
    mongoose
        .connect(DB)
        .then((con) => {
            console.log('Successfully connected to database.');
        })
        .catch((e) => {
            console.log('Connected failed, ', e);
        });
};

module.exports = { connect };
