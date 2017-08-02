var mysql = require('mysql');
var connection = mysql.createConnection({
				  host     : 'localhost',
				  user     : 'root',
				  password : ''
				});

connection.query('USE dasernet');	

module.exports = connection;



