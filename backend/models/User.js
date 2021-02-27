const mysql = require('mysql');
const DB = require('./DataBase');

exports.createUser = customer =>{
	let query = 'INSERT INTO Users (email, password) VALUES (?, ?)';
	query = mysql.format(query, customer);
	return new Promise((resolv, reject) => {
		DB.dbConnect.query(query, (error, res, field) => {
			if (error) reject(error);
			resolv(res);
		});
	});
};

exports.searchUser = customer =>{
	let query = 'SELECT * FROM Users WHERE email = ?';
	query = mysql.format(query, customer);
	return new Promise((resolv, reject) => {
		DB.dbConnect.query(query, (error, res, field) => {
			if (error) reject(error);
			resolv(JSON.parse(JSON.stringify(res)));
		});
	});
};

exports.getConnectedUsers = () =>{
	let query = 'SELECT id, firstName, lastName, picture FROM Profils WHERE is_active = 1';
	query = mysql.format(query);
	return new Promise((resolv, reject) => {
		DB.dbConnect.query(query, (error, res, field) => {
			if (error) reject(error);
			const Users = res.map(user =>{
				return(JSON.parse(JSON.stringify(user)))
			});
			resolv(Users);
		});
	});
};

exports.updateUser = customer =>{
	let query = 'UPDATE  Users SET ??=?, ??=? WHERE ??=?';
	query = mysql.format(query, customer);
	return new Promise((resolv, reject) => {
		DB.dbConnect.query(query, (error, res, field) => {
			if (error) reject(error);
			resolv(res);
		});
	});
};


exports.deleteUser = customer =>{
	let query = 'DELETE FROM Users WHERE ??=?';
	query = mysql.format(query, customer);
	return new Promise((resolv, reject) => {
		DB.dbConnect.query(query, (error, res, field) => {
			if (error) reject(error);
			resolv(res);
		});
	});
};

exports.createProfil = Profil =>{
	let query = 'INSERT INTO Profils (firstName, lastName, user_id, created_date, picture) VALUES (?, ?, (SELECT id FROM Users WHERE email=?), NOW(), ?)';
	query = mysql.format(query, Profil);
	console.log(query);
	return new Promise((resolv, reject) => {
		DB.dbConnect.query(query, (error, res, field) => {
			if (error) reject(error);
			resolv(res);
		});
	});
};

exports.updateProfil = Profil =>{
	let query = 'UPDATE  Profils SET ??=?, ??=? WHERE ??=?';
	query = mysql.format(query, Profil);
	return new Promise((resolv, reject) => {
		DB.dbConnect.query(query, (error, res, field) => {
			if (error) reject(error);
			resolv(res);
		});
	});
};

exports.getProfil = (id) => {
	let query = 'SELECT firstName, lastName, picture FROM Profils WHERE user_id = ?';
	query = mysql.format(query, [id]);
	console.log(query);
	return new Promise((resolv, reject) => {
		DB.dbConnect.query(query, (error, res, field) => {
			if (error) reject(error);
			resolv(JSON.parse(JSON.stringify(res)));
		});
	});
}
