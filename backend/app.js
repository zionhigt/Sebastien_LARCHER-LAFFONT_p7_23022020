const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const postsRoutes = require('./routes/posts');
const otherRoutes = require('./routes/other');
const commentsRoutes = require('./routes/comments');
const mysql = require('mysql');

const User = require('./models/User.js')

const path = require('path');




// User.updateUser(['email', 'larcher501@gmail.org', 'password', '2565', 'email', 'larcher501@gmail.fr'])
// .then(res => {console.log(res)})
// .catch(err => {console.log(err)});

const app = express();

app.use((req, res, next)=>{
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

app.use(bodyParser.json());

/////////////// Joining routes ///////////////////////
app.use('/api/auth', userRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/others', otherRoutes);
app.use('/api/comments', commentsRoutes);

module.exports = app;