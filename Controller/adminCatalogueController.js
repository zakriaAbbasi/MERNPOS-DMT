var express= require('express'); 
var app= express();
var jwt    = require('jsonwebtoken');

///Connect to DataBasae
var mongoose = require('mongoose');
var config= require('../DBconfig');
mongoose.connect(config.database);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
(db.on('error', console.error.bind(console, 'MongoDB connection error:')));

var article_instance = require('../models/article');
var emp_instance= require('../models/employee');
var pakg_instance= require('../models/package');
//Function To Login

exports.loginandGetToken = function(req, res)
 {
    emp_instance.findOne(  
        // query
        {Emp_name:req.body.name}, (err, Emp) => {
if (err) return res.status(200).send(err)
if(Emp==null)
{
   return res.status(200).json(message='Invalid username')
}
else if(req.body.password != Emp.Emp_password)
{
   return res.send({msg:'password Invalid'});
}
else if(Emp.Emp_type !='admin')
{
   return res.send({msg:'This user is not allowed to Access this Domain'});
}
else
{
   // res.send('login Successfull and token generated');
    //Generate JWT Token
    const payload = {
        name: req.body.name 
      };
          var token = jwt.sign(payload, config.secret, {expiresIn: 86400 // expires in 24 hours
        });
        
 //          return the information including token as JSON
        return res.json({
            success: true,
            message: 'logged in!!! Enjoy your token!',
            token: token,
            type: Emp.Emp_type
          });     
}
        });
};

//Function to Create new Article
exports.CreatenewArticle= function(req, res)
 {
     var articlemodel = new article_instance({ item_name:req.body.name, item_type:req.body.type,
        price:parseInt(req.body.price), 
        size:req.body.size,
        date_added: req.body.date});
        //fetch last document and increment article id
        article_instance.find().sort({"_id": -1}).limit(1).exec(function(err,latest){
        if(latest[0]!=null){ articlemodel.item_id=latest[0].item_id + 1;
        articlemodel.id2=req.body.newid+(latest[0].item_id+1)}
        else{articlemodel.id2=req.body.newid+'001'}
        
        //save new article
        articlemodel.save(function (err) {
        if (err)
        return res.json(err);
        else
          return res.json({id:articlemodel.id2,message:'Article Added Succesfully'});
        // saved!
    });
});
 }
 //Delete A Article
 exports.DeleteArticle= function(req, res)
 {
    article_instance.deleteOne(  
        
        // query
        {item_id:req.body.id},
    
        //{Emp_name: true,Emp_cnic:true,Emp_type:true},
    
        // callback function
        (err, article) => {
            if (err) return res.status(200).send(err)
            if(article==null)
            return res.status(200).json(message='No Article With this id');
            else
            return res.status(200).json('Article deleted Successfully');
        }
    );
 }
 //Function to Fetch all Articles


 exports.FetchAllArticle= function(req,res){
    article_instance.find()
    .then(article => {
        if(article==null){ res.json({message:'No Article Found'})}
        else
        return res.json(article);
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving all Articles."
        });
    });
};

//Funtion To Fetch an Article


exports.fetchoneArticle= function(req,res){
    article_instance.findOne(  
        
        // query
        {item_id:req.body.id},
    
        
    
        // callback function
        (err, article) => {
            if (err) return res.status(200).send(err)
            if(article==null)
            return res.status(200).json(message='No Article With this id')
            else
            return res.status(200).json(article)
        }
    );
};
 //Function to create New Pakage
exports.CreatePakage= function(req, res)
 {
     console.log(req.body.items);
     // Validate request
    if(!req.body.items | !req.body.number) {
        console.log('not validated');
        return res.send({   
            message: "Pakage content can not be empty"});
    }
    var pakg = new pakg_instance({items:req.body.items.split(',').map(function(i){
        return parseInt(i);}) ,shop_id:req.body.shop,
        date_sent: req.body.date,
    });
     //fetch last document and increment article id
     pakg_instance.find().sort({"_id": -1}).limit(1).exec(function(err,latest){
        if(latest[0]!=null){ pakg.package_number=latest[0].package_number + 1; }
       pakg.save(function (err) {
        if (err)
         return res.json(err);
        else
         return  res.json({message:'pakage Added Succesfully'});
          console.log("Data entered");
        // saved!
    });
});
 }
 exports.ShowPakages= function(req,res){
    pakg_instance.find()
    .then(package => {
        if(package==null){ res.json({message:'No Package Found'})}
        else
        return res.json(package);
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving all Packages."
        });
    });
};
//Funtion To Fetch an Article
exports.Showonepakg= function(req,res){
    pakg_instance.findOne(  
        
        // query
        {package_number:req.body.number},
    
        //{Emp_name: true,Emp_cnic:true,Emp_type:true},
    
        // callback function
        (err, package) => {
            if (err) return res.status(200).send(err)
            if(package==null)
            return res.status(200).json(message='No Package With this number')
            else
            return res.status(200).json(package)
        }
    );
};