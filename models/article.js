var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ArticleSchema = new Schema(
  {
    item_name: {type: String, required: true, max: 100},
    retail_price: {type: Number},
    factory_price: {type: Number},
    size: {type: String},
    item_id: {type: Number, default: 1},
    description: {type: String, max: 100}
   }
);

//Export model
module.exports = mongoose.model('Article', ArticleSchema);