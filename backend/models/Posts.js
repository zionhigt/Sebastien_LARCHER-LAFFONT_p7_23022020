const mysql = require('mysql');
const DB = require('./DataBase');

exports.getPosts = () =>{
	let query = 'SELECT Profils.is_active AS userActive, Profils.lastName, Profils.firstName, Posts.id AS id, Posts.title, Posts.description, Posts.media, Profils.picture, UNIX_TIMESTAMP(Posts.posted_date) AS date, (SELECT COUNT(*) FROM Comments WHERE Post_id = Posts.id) AS comment_count, likes, dislikes FROM Posts JOIN Profils ON Posts.profil_id = Profils.id ORDER BY date DESC';
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

exports.getOnePost = (id) =>{
	let query = 'SELECT Profils.is_active AS userActive, Profils.lastName, Profils.firstName, Posts.id AS id, Posts.title, Posts.description, Posts.media, Profils.picture, UNIX_TIMESTAMP(Posts.posted_date) AS date, (SELECT COUNT(*) FROM Comments WHERE Post_id = Posts.id) AS comment_count, likes, dislikes FROM Posts JOIN Profils ON Posts.profil_id = Profils.id WHERE Posts.id = ?';
	query = mysql.format(query, [id]);
	return new Promise((resolv, reject) => {
		DB.dbConnect.query(query, (error, res, field) => {
			if (error) reject(error);
			console.log(error);
			resolv(JSON.parse(JSON.stringify(res)));
		});
	});
};

exports.sendPost = (body) =>{
	const params = Object.keys(body).map(k => {return("?")}).join(',');
  // Preparing mysql query
  	let query = mysql.format(`INSERT INTO Posts (${Object.keys(body).join(', ')}, posted_date) VALUES (${params}, NOW())`, Object.values(body));
	query = mysql.format(query);
	console.log(query);
	return new Promise((resolv, reject) => {
		DB.dbConnect.query(query, (error, res, field) => {
			if (error) reject(error);

			resolv(true);
		});
	});
};

exports.getLikesDislikes = (id) =>{
	let query = 'SELECT likes, dislikes FROM Posts WHERE id = ?';
	query = mysql.format(query, [id]);
	return new Promise((resolv, reject) => {
		DB.dbConnect.query(query, (error, res, field) => {
			if (error) reject(error);
			resolv(JSON.parse(JSON.stringify(res)));
		});
	});
};


exports.updateLikesDislikes = (likes, dislikes, id) =>{
	let query = 'UPDATE Posts SET likes= ?, dislikes = ? WHERE id = ?';
	query = mysql.format(query, [likes, dislikes, id]);
	console.log(query)
	return new Promise((resolv, reject) => {
		DB.dbConnect.query(query, (error, res, field) => {
			if (error) reject(error);
			console.log(res);
			resolv(res);
		});
	});
};

