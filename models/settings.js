var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var settingSchema = new Schema({
    currency_type: {type : String, default: 'PKR'},
    tax_setting:{type : String , default: '50'},
    company_name: {type : String , default: 'nerdware'},
    Set_Email: {type : String , default: 'nerdwaretech@outlook.com'},
    Set_address: {type : String ,default: 'f8'},
    Set_compNTS: {type : String , default: '1122'}
});

module.exports = mongoose.model('Settings' , settingSchema);