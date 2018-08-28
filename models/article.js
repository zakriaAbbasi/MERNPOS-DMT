var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ArticleSchema = new Schema(
  {
    item_id: {type: Number, default: 1},
    item_name: {type: String, required: true, max: 100},
    quantity: {type: Number, default: 1},
    threshold: {type: Number},
    retail_price: {type: Number},
    factory_price: {type: Number},
    description: {type: String, max: 100}
   }
);

//Export model
module.exports = mongoose.model('Article', ArticleSchema);