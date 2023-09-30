const expressJwt = require('express-jwt');
const config = require('./config.js');
const jwt = require('jsonwebtoken');
const { getUserById } = require('../services/user.service.js');
async function isRevoked(_req, _payload, done) {
	done();
}

function jwtFunc() {
	const { secret } = config.jwt;
	return expressJwt({
		secret,
		getToken: function fromHeaderOrQuerystring(req) {

			const token = req.headers.authorization
				? req.headers.authorization.split(' ')[1]
				: req.query.token;

			if (token) {
				const decodedToken = jwt.decode(token, secret);
				console.log("ssss", decodedToken)
				if (decodedToken) {
					req.decodedTokenUser = decodedToken;
				}
				return token;
			}
			return null;
		},
		algorithms: ['HS256'],
		isRevoked,
	}).unless({
		path: [
			// public routes that don't require authentication
			/\/v[1-9](\d)*\/(auth|docs|public)\/.*/,
		],
	});
}


module.exports = { jwt: jwtFunc };
