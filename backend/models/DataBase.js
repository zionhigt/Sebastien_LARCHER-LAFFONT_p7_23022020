const mysql = require('mysql');

const options = {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: 'groupomania'
	}
	
const dbConnect = mysql.createConnection(options);

module.exports = {options, dbConnect};
