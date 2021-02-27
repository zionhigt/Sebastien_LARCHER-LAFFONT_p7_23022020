const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.debug = (req, res) => {
	console.log(req.headers);
	res.status(200).json({message: 'Session created'});
};

const color = max => {
  return Math.floor(Math.random() * Math.floor(max));
}
exports.signup = (req, res) => {
	bcrypt.hash(req.body.password, 10)
	.then(hash => {
		User.createUser([req.body.email, hash])
		.then(user => {
			if(req.body.firstName && req.body.lastName)
			{
				if(!req.body.picture)
				{
					const colors = ['e921c7',
									'55756e',
									'755b77',
									'40a186',
									'581ac4',
									'6f7fe3',
									'0a8b5f',
									'f2bf7b',
									'7f16da',
									'ad943a',
									'14b682',
									'bd3d78',
									'380bfb',
									'd99206',
									'696374',
									'd065a7',
									'a4b996',
									'679979',
									'6a1166',
									'7135c3',
									'7a84d8',
									'46e945'
								]
					const colorHexa = color(colors.length);
					req.body.picture = `https://via.placeholder.com/300/${colors[colorHexa]}/FFFFFF/?text=${req.body.firstName[0]}`
				}
				let infos = [req.body.firstName, req.body.lastName, req.body.email, req.body.picture]
				User.createProfil(infos)
				.then(profil => {
					res.status(201).json({message: "created user", noProfil: false});
				})
				.catch(error => {console.log(error); res.status(500).json({ error })})
			}
			else
			{
				res.status(201).json({message: "created user", noProfil: true});

			}
		})
		.catch(err => {
			if(err.code == 'ER_DUP_ENTRY')
			{
				res.status(403).json({error: "Adresse email déja utilisée"})

			}
			res.status(500).json({error: "Erreur interne"})
		});
	})
	.catch(error => res.status(500).json({ error }));
	
};

exports.signin = (req, res) => {
	User.searchUser([req.body.email])
	.then(user => {
		bcrypt.compare(req.body.password, user[0].password)
		.then(valide => {
			if(!valide)
			{
				res.status(401).json({error: "Mot de passe incorecte"})
			}
			req.session.user = user[0];
			// req.sessionID = user[0].id;
			res.status(200).json({message: 'connected'});
			// req.session.save(() => {
			// })
			// .then()
			// .catch(error => res.status(302).json({ error }))

		})
		.catch(error => res.status(500).json({ error }));
	})
		
	.catch(error => {console.log(error); res.status(403).json({error: "Aucuns utilisateur n'a été trouvé !"})})
}

exports.signout = (req, res) => {
	if(!req.session.user)
	{
		res.status(302).json({message: "Aucune session en cour !"});
	}
	else
	{
		req.session.destroy();
		delete req.session;
		res.status(200).json({message: "Aurevoir !"});
	}
};

exports.getUserProfil = (req, res) => {
	if(!req.session.profil)
	{
		User.getProfil(req.session.user.id)
		.then(profil => {
			req.session.profil = profil[0];
			res.status(200).json(profil);
		})
		.catch(error => {console.log(error); res.status(500).json({ error })});

	}
	else
	{
		res.status(200).json(req.session.profil);
	}
};

exports.getConnected = (req, res) => {
	User.getConnectedUsers()
	.then(users => {
		res.status(200).json(users);
	})
		
	.catch(error => {console.log(error); res.status(500).json({ error })})
}
