const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billSchema = new Schema({
    billNumber: Number,
    date: Date,
    customerName: String,
    address: String, 
    imeiNumber: String,
    modelNumber: String, 
    chargerNumber: String, 
    warrenty: String, 
    amount: Number
})

module.exports = mongoose.model("Bill", billSchema);