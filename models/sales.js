var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SaleSchema = new Schema(
  {
    products:[{item_id: {type: Number, max: 100},
    item_name: {type: String, required: true, max: 100},
    price: {type: Number,}}],

    date_sale: {type: Date},
    shop: {type: String,  max: 100},
    total: {type:Number},
  }
);

//Export model
module.exports = mongoose.model('Sale', SaleSchema);
