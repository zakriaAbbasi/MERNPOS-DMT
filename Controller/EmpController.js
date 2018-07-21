var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');
var config = require('../DBconfig');
///Connect to DataBasae
var mongoose = require('mongoose');
mongoose.connect(config.database);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
(db.on('error', console.error.bind(console, 'MongoDB connection error:')));

var emp_instance = require('../models/employee');
var sales_instance = require('../models/sales');
var article_instance = require('../models/article');


//Function to Authenticate and Authorize head
exports.loginandGetToken = function (req, res) {
    emp_instance.findOne(
        // query
        {cnic:req.body.cnic}, (err, Emp) => {
if (err) return res.status(200).send(err)
if(Emp==null)
{
   return res.status(200).json(message='Invalid username')
}
else if(req.body.password != Emp.password)
{
   return res.send({msg:'password Invalid'});
}
else
{
    const payload = {
        cnic: req.body.cnic
      };
          var token = jwt.sign(payload, config.secret, {expiresIn: 86400 // expires in 24 hours
        });

 //          return the information including token as JSON
        return res.json({
            success: true,
            message: 'Emp logged in!!! Enjoy your token!',
            token: token,
            type: 'emp'
         });
}
    });
}
//Function to see all items
exports.FetchAllArticle= function(req,res){
    article_instance.find({item_id:true,item_name: true,retail_price: true, description:true})
    .then(article => {
        if(article==null){ res.json({message:'No Item Found'})}
        else
        return res.json(article);
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving all Items."
        });
    });
};

//Function To Make New Sale
exports.makesale= function(req,res){
    req.body.products= req.body.products.split(',').map(function(i){
        return parseInt(i);})
        var salesmodel= new sales_instance({total:0,date_sale:req.body.sale,Emp_Cnic:req.body.cnic});  
        //fetch details of all products from articles collection
        for(var i=0; i<req.body.products.length; i++)
        {
           article_instance.findOne(     
            // query
            {item_id:req.body.products[i]},
            {item_id:true,item_name: true,retail_price: true,},function(err,article){
                if (err) {return res.json(err);}
                else{
                 salesmodel.products.push(article);
                 salesmodel.total=salesmodel.total+article.retail_price;
                }
                if(salesmodel.products.length === req.body.products.length)
                {
                        console.log(salesmodel.products.length);
                        salesmodel.save(function(){});
                }
     });
        }
       
     res.json('Done');   
    }
    
    //function to fetch sales
exports.Showsales = function (req, res) {
            sales_instance.find()
                .then(sal => {
                    if (sal.length == 0) {
                        res.json({
                            msg: "No data available to show"
                        })
                    } else
                        res.json(sal);
                }).catch(err => {
                    return res.status(500).send({
                        message: err.message || "Some error occurred while retrieving all Sales."

                    });
                });
};
