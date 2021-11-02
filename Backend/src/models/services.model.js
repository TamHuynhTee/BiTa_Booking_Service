const mongoose = require('mongoose');
const Schema = mongoose.Schema
// const slug = require('mongoose-slug-generator');


const Service = new Schema({
    name: {type: String, default: ''},
    type: {type: String},
    price: {type:String},
    priceDeposit: {type:String},
    description: {type: String},
    image: {type: String},
    // slug: {type: String},
}, {
    timestamps: true,
});

// // Add plugin
// mongoose.plugin(slug);
// // Soft deleted
// Course.plugin(mongooseDelete, { 
//     deletedAt: true,
//     overrideMethods: true 
// });

module.exports = mongoose.model('Service', Service);