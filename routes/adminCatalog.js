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
router.post('/addArticle',Controller.CreatenewArticle);


module.exports = router;