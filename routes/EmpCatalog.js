var express = require('express');
var router = express.Router();
/* GET users listing. */
var varifyToken= require('../TokenVerify');
router.use(varifyToken);

module.exports = router;