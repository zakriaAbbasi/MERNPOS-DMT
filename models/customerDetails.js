var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var cutomerDetails = new Schema({
    customerName:{type: String},
    customerPhone:{type: String}
});

module.exports=mongoose.model('CustomerDetails' , cutomerDetails);