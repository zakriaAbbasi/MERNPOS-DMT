var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ShopInventorySchema = new Schema(
  {
    item_id: {type:Number},
    item_name: {type: String, required: true, max: 100},
    price: {type: Number},
    id2:{type:String,required: true,max:100},
    shop_id: {type: String, max: 100},
  }

);

//Export model
module.exports = mongoose.model('Shopinventory', ShopInventorySchema);
