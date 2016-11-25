var express = require('express');
var homeController=require('../controllers/homeController');
var router = express.Router();

/* GET home page. */
router.get('/', homeController.index);

module.exports = router;
