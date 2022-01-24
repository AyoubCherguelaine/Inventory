var express = require('express');
var router = express.Router();

const controller = require('../Controllers/Login');


router.get('/', controller.SignUpGetPage(req,res)); // get sign up 

router.post('/', controller.SignUpPost(req,res)); // post sign up and login automatically


module.exports = router;