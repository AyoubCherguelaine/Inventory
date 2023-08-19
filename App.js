var session = require('express-session');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
var express = require('express')

const expressListEndpoints = require('express-list-endpoints');

require('dotenv').config();

const articleRoutes = require('./routes/Article');
const BaseArticleRoutes = require('./routes/BaseArticle');
const DimensionRoutes = require('./routes/Dimension');
const ActorRoutes = require("./routes/Actor")
const WarehouseRoutes = require("./routes/Warehouse")

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

  const endpoints = expressListEndpoints(app);
  console.log('\nAll Endpoints:');
  endpoints.forEach((route) => {
    console.log(`${route.methods.join(', ')} -> ${route.path}`);
  });

});


app.use('/article',articleRoutes);
app.use('/basearticle',BaseArticleRoutes)
app.use('/dimension',DimensionRoutes)
app.use('/actor',ActorRoutes)
app.use('/warehouse',WarehouseRoutes)

// test endpoint names



