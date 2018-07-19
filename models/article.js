var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ArticleSchema = new Schema(
  {
    item_name: {type: String, required: true, max: 100},
    item_type: {type: String, required: true, max: 100},
    price: {type: Number},
    date_added: {type: Date},
    size: {type: String},
    item_id: {type: Number, default: 1},
    id2:{type:String,required: true,max:100},
    sold: {type : Boolean, default:false},
   }
);

//Export model
module.exports = mongoose.model('Article', ArticleSchema);