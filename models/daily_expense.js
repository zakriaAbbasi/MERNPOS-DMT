var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DailyExpenseSchema = new Schema({
        date: {
            type: Date,
            required: true
        },
        expense: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
            
        },
    }

);
//Export model
module.exports = mongoose.model('DailyExpense', DailyExpenseSchema);
