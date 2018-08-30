var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subs = new Schema(
  {
      subscription: {type:JSON, required: true} ,
  }
);

//Export model
module.exports = mongoose.model('Sub',subs);
