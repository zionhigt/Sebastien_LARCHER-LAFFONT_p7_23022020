const mysql = require('mysql');
const DB = require('./DataBase');

exports.getPosts = () =>{
	let query = 'SELECT Profils.is_active AS userActive, Profils.lastName, Profils.firstName, Posts.id AS id, Posts.title, Posts.description, Posts.media, Profils.picture, UNIX_TIMESTAMP(Posts.posted_date) AS date FROM Posts JOIN Profils ON Posts.profil_id = Profils.id ORDER BY date DESC';
	query = mysql.format(query);
	return new Promise((resolv, reject) => {
		DB.dbConnect.query(query, (error, res, field) => {
			if (error) reject(error);
			const posts = res.map(post =>{
				return(JSON.parse(JSON.stringify(post)))
			});
			resolv(posts);
		});
	});
};


