var express = require('express');
var router = express.Router();
var app=express();
var Controller= require('../Controller/adminCatalogueController');
router.post('/',Controller.loginandGetToken);
var varifyToken= require('../TokenVerify');
router.use(varifyToken);
/* GET users listing. */

router.post('/addEmp',Controller.CreatenewEmp);
router.post('/deleteEmp',Controller.Deleteemp);
router.post('/showEmp',Controller.fetchoneemp);
router.post('/showAllEmps',Controller.fetchallemps);
router.post('/additem',Controller.CreatenewArticle);
router.post('/deleteitem',Controller.DeleteArticle);
router.post('/viewallitems',Controller.FetchAllArticle);
router.post('/fetchitembyname',Controller.fetchoneByname);
router.post('/fetchitembyid',Controller.fetchoneByid);

module.exports = router;

