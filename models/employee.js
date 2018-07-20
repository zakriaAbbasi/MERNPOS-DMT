var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EmpSchema = new Schema(
  {
    name: {type: String, required: true, max: 100},
    password: {type: String, required: true, max: 50},
    cnic: {type: String, required: true,  max: 20},
    phone: {type: String, required: true,  max: 20},
  }

);

//Export model
module.exports = mongoose.model('Employee',EmpSchema);
