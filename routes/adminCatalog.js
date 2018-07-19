var express = require('express');
var router = express.Router();
var app=express();
var Controller= require('../Controller/adminCatalogueController');
router.post('/',Controller.loginandGetToken);
var varifyToken= require('../TokenVerify');
router.use(varifyToken);
/* GET users listing. */

router.post('/addArticle',Controller.CreatenewArticle);
router.post('/DeleteArticle',Controller.DeleteArticle);
router.post('/showArticles',Controller.FetchAllArticle);
router.post('/show1Article',Controller.fetchoneArticle);
router.post('/Createnewpakg',Controller.CreatePakage);
//router.post('/showPackages',Controller.ShowPakages);
//router.post('/show1Package',Controller.Showonepakg);


module.exports = router;