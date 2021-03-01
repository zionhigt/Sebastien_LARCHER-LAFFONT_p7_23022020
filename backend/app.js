const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const postsRoutes = require('./routes/posts');
const otherRoutes = require('./routes/other');
const commentsRoutes = require('./routes/comments');
const mysql = require('mysql');

const User = require('./models/User.js')

const path = require('path');

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const DB = require('./models/DataBase');


const sessionStore = new MySQLStore(DB.options);





// User.updateUser(['email', 'larcher501@gmail.org', 'password', '2565', 'email', 'larcher501@gmail.fr'])
// .then(res => {console.log(res)})
// .catch(err => {console.log(err)});

const app = express();



app.use((req, res, next)=>{
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Headers', 'x-www-urlencode, x-Content-Type,  Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	next();
});


app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false,
	cookie: { path: '/', _expires: null, originalMaxAge: 86400000, httpOnly: true, sameSite: 'lax', secure: false}
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/////////////// Joining routes ///////////////////////
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/others', otherRoutes);
app.use('/api/comments', commentsRoutes);

module.exports = app;