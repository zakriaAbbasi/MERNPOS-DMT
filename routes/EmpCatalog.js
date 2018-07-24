var express = require('express');
var router = express.Router();

var app=express();
var Controller= require('../Controller/EmpController');
router.post('/',Controller.loginandGetToken);
var varifyToken= require('../TokenVerify');
router.use(varifyToken);
/* GET users listing. */
router.post('/FetchItems',Controller);
router.post('/Makesale',Controller.makesale);
router.post('/fetchsales',Controller.Showsales);


module.exports = router;