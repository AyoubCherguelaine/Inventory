var session = require('express-session');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
var express = require('express')


const Login= require('./routers/Login');


var app = express();


app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(express.static('./public'));
app.use(cookieParser());
app.set('view engine', 'ejs');

var max = 60000 *60*24;//day
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: max }}));

// Access the session as req.session





app.get('/Dashboard', function(req, res){

        res.send('welcome');
    
});




app.listen(8000);


app.use('/login',Login);