var express = require('express');
var router = express.Router();

var app=express();
var empController= require('../Controller/EmpController');
router.post('/',empController.loginandGetToken);
var varifyToken= require('../TokenVerify');
router.use(varifyToken);
/* GET users listing. */

router.post('/sale',empController.makesale);
router.post('/fetchallitems',empController.FetchAllArticle);
router.post('/showsales',empController.Showsales);

module.exports = router;
