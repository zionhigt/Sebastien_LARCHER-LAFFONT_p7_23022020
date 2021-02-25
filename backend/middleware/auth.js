// authorization
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>
{
	try
	{
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN);
		const userId = decodedToken.userId;
		if(req.body.userId && req.body.userId === userId)
		{
			next();
		}
		else
		{
			throw  "Not allowed";
		}
	}
	catch(error)
	{
		res.status(403).json({  error });
	}

}