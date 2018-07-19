var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PackageSchema = new Schema(
  {
    package_number: {type: Number, default: 1},
    items: [{type: Number, }],
    shop_id: {type: String,  max: 100},
    date_sent: {type: Date},
    status: {type: String,  max: 100, default:'delivered'},
  }
);

//Export model
module.exports = mongoose.model('Package', PackageSchema);
