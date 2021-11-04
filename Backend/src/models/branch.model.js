const mongoose = require('mongoose');

const branchSchema = mongoose.Schema({}, { timestamps: true });

const Branch = mongoose.model('Branch', branchSchema);
module.exports = Branch;
