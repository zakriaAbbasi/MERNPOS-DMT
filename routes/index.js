var express = require('express');
var router = express.Router();
var path = require('path');
var subsInstance = require('../models/subscription');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});
router.post('/subs',function(req,res){
  console.log (req.body);
   var subs = new subsInstance({ subscription:(req.body)});
   subs.save(function (err) {
       if (err)
        return res.json(err);
       else{
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ data: { success: true } }));
       }
});
});
module.exports = router;
