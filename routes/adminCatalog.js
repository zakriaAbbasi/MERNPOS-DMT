var express = require('express');
var router = express.Router();
var app=express();
var Controller= require('../Controller/adminCatalogueController');
router.post('/',Controller.loginandGetToken);
var varifyToken= require('../TokenVerify');
router.use(varifyToken);
/* GET users listing. */

router.post('/addemp',Controller.CreatenewEmp);
router.post('/deleteemp',Controller.Deleteemp);
router.post('/showemp',Controller.fetchoneemp);
router.post('/showallemps',Controller.fetchallemps);
router.post('/additem',Controller.CreatenewArticle);
router.post('/deleteitem',Controller.DeleteArticle);
router.post('/viewallitems',Controller.FetchAllArticle);
router.post('/fetchitembyname',Controller.fetchoneByname);
router.post('/fetchitembyid',Controller.fetchoneByid);
router.post('/fetchsales',Controller.Showsales);
router.post('/showstats',Controller.displaySales);
module.exports = router;
