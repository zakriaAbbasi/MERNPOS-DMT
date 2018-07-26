var express = require('express');
var router = express.Router();

var app=express();
var Controller= require('../Controller/EmpController');
router.post('/',Controller.loginandGetToken);
var varifyToken= require('../TokenVerify');
router.use(varifyToken);
/* GET users listing. */
router.post('/FetchItems',Controller.FetchAllArticle);
router.post('/Makesale',Controller.makesale);
router.post('/fetchsales',Controller.Showsales);
router.get('/fetchdexp',Controller.FetchDailyExpense);
router.post('/add-dexpense',Controller.AddDailyExpense);
module.exports = router;