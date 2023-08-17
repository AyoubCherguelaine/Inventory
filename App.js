var session = require('express-session');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
var express = require('express')

require('dotenv').config();

const articleRoutes = require('./routes/Article');
const BaseArticleRoutes = require('./routes/BaseArticle');
const DimensionRoutes = require('./routes/Dimension');

var app = express();


app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(express.static('./public'));
app.use(cookieParser());

var max = 60000 *60*24;//day
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: max }}));

// Access the session as req.session

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.use('/articles',articleRoutes);
app.use('/basearticle',BaseArticleRoutes)
app.use('/dimension',DimensionRoutes)