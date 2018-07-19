var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EmpSchema = new Schema(
  {
    Emp_name: {type: String, required: true, max: 100},
    Emp_username: {type: String, required: true,  max: 50},
    Emp_password: {type: String, required: true, max: 50},
    Emp_cnic: {type: String, required: true,  max: 20},
    Emp_type: {type: String, required: true,  max: 50},
    shop_id:  {type: String, max:20},
    Emp_city: {type: String, required: true,  max: 50},
    Emp_zip: {type: String, required: true,  max: 50},
    Emp_state: {type: String, required: true,  max: 50},
    Emp_phone: {type: String, required: true,  max: 50},
    Emp_country: {type: String, required: true,  max: 50},
    shop_address: {type: String, required: true,  max: 100},
    Emp_nationality: {type: String, required: true,  max: 50},
    Emp_address: {type: String, required: true,  max: 50},
    Emp_mobile: {type: String, required: true,  max: 50}
  }

);

//Export model
module.exports = mongoose.model('Employee',EmpSchema);
