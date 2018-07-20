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

var emp_instance = require('../models/employee');

//Function To Login
exports.loginandGetToken = function(req, res)
{
var nam= req.body.name;
var pass= req.body.password;
if(nam != 'dmt')
{
    return res.send({msg:'invalid Username'});
}
else if(pass != "1234")
{
   return res.send({msg:'password Invalid'});
}
else
{
   // res.send('login Successfull and token generated');
    //Generate JWT Token
    const payload = {
        name: nam
      };
          var token = jwt.sign(payload, config.secret, {expiresIn: 86400 // expires in 24 hours
        });

 //          return the information including token as JSON
        return res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token,
            type: 'admin'
          });
}
};

//Function to Create new Employee
exports.CreatenewEmp= function(req, res)
 {
     var Emp = new emp_instance({
        name:req.body.name,
        password:req.body.password,
        cnic:req.body.cnic,
        phone: req.body.phone,
    });
    Emp.save(function (err) {
        if (err)
         return handleError(err);
         
        else
          res.send({msg:"Data Entered Successfully"});
          console.log("Data entered");
    });
}
 //Function to Fetch all Employyess
exports.fetchallemps= function(req,res){
    emp_instance.find()
    .then(Emp => {
        console.log(Emp);
        if(Emp[0]==null){ res.json({message:'No Employee Found'})}
        else
       return res.json(Emp);
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving all Employeess."
        });
    });
};
//Funtion To Fetch an Employee
exports.fetchoneemp= function(req,res){
    emp_instance.findOne(
        // query
        {cnic:req.body.cnic},

        {name: true,cnic:true,phone:true},

        // callback function
        (err, Emp) => {
            if (err) return res.status(200).send(err)
            if(Emp==null)
            return res.status(200).json(message='No Employee With this Cnic')
            else
            return res.status(200).json(Emp)
        }
    );
};
//Function to Delete an Employee
exports.Deleteemp= function(req, res)
 {
  emp_instance.findOneAndRemove({cnic:req.body.cnic})
  .then(Emp => {
      if(!Emp) {
          return res.status(404).send({
              message: "Employee not found with cnic " + req.body.cnic
          });
      }
      res.send({message: "Employee deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'Emp_cnic' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Employee not found with cnic " + req.body.cnic
          });
      }
      return res.status(500).send({
          message: "Could not delete Employee with cnic " + req.params.cnic
      });
  });
 }


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


exports.fetchoneByid= function(req,res){
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

exports.fetchoneByname= function(req,res){
    article_instance.findOne(  
        
        // query
        {item_id:req.body.name},
    
        
    
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

//function to enter data for articles
exports.createNewSale1= function (req, res) {
    var Sall = new sales_instance({
        item_id: req.body.proid,
        item_name: req.body.iname,
        retail_price: req.body.rprice,
        factory_price: req.body.fprice,
    });
    Sall.save(function (err) {
        if (err)
            return res.json(err);

        else
            res.send({
                msg: "Data Entered Successfully"
            });
        console.log("Data entered");
        // saved!
    });
};