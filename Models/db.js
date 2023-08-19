var mysql = require('mysql');


var connection = mysql.createConnection({
  host     : process.env.host || 'localhost' ,
  user     : process.env.user || 'LocalDev',
  password : process.env.password || '123345',
  database : process.env.database || 'web',
});


connection.connect();





module.exports = {connection};