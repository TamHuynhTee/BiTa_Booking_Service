const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
    username: {
        type: String,
        required: 'Username is required',
        unique: true,
    },
    surName: {
        type: String,
        required: true,
        maxlength: 50,
    },
    firstName: {
        type: String,
        required: true,
        maxlength: 50,
    },
    email: {
        type: String,
        required: 'Email is required',
        trim: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please fill a valid email address',
        ],
    },
    phone: {
        type: String,
        minlength: 10,
        maxlength: 10,
        required: 'Phone number is required',
        unique: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        default: null,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'company', 'user'],
        required: true,
    },
    isActive: Boolean,
    avatar: {
        type: String,
        default: null,
    },
    birthday: {
        type: Date,
        default: Date.now,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Account', Account);
