const mysql = require('mysql');
const DB = require('./DataBase');

exports.getByPostId = (id) =>{
	let query = 'SELECT Comments.id AS id, Profils.lastName, Profils.firstName, UNIX_TIMESTAMP(Comments.comment_date) AS date, Comments.comment_text AS text FROM Comments JOIN Profils ON Comments.profil_id = Profils.id WHERE Comments.post_id = ?';
	query = mysql.format(query, [id]);
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


