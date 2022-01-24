
var express = require('express');
var router = express.Router();

const controlller = require('../Controllers/Login');




// controlller.LoginGetPage(req,res)
router.get('/',controlller.LoginGetPage); // get page /login

router.post('/',controlller.LoginPost);

module.exports = router;