var express = require('express');
var router = express.Router();
var headController= require('../Controller/headofficeCatalogueController');
/* GET users listing. */
router.post('/', headController.loginandGetToken);
var varifyToken= require('../TokenVerify');
router.use(varifyToken);
router.post('/AddEmp', headController.CreatenewEmp);
router.post('/ShowEmps', headController.fetchallemps);
router.post('/searchemp', headController.fetchoneemp);
router.post('/Deleteemp', headController.Deleteemp);
router.post('/SetSettings', headController.updateSettings);
router.post('/viewsales', headController.sales1);
router.post('/sales', headController.createNewSale1);
router.post('/customerdetails', headController.cusDetails);
module.exports = router;