const User = require('../models/User');

exports.signup = (req, res) => {
	User.createUser([req.body.email, req.body.password])
	.then(responce => {
		console.log(responce);
		res.status(201).json({message: "created user"});
})
	.catch(err => {
		if(err.code == 'ER_DUP_ENTRY')
		{
			res.status(403).json({error: "Adresse email déja utilisée"})

		}
		res.status(500).json({error: "Erreur interne"})
});
};

exports.signin = (req, res) => {

	User.searchUser([req.body.email])
	.then(responce => {
		if(req.body.password == responce[0].password)
		{
			res.status(200).json({message: 'connected'});
		}
		else
		{
			throw "Mot de passe incorecte";
		}
	})
		
	.catch(error => {console.log(error); res.status(403).json({ error })})
}


exports.getConnected = (req, res) => {

	User.getConnectedUsers()
	.then(users => {
		res.status(200).json(users);
	})
		
	.catch(error => {console.log(error); res.status(500).json({ error })})
}
