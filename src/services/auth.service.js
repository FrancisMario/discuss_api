const httpStatus = require('http-status');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const { decryptData } = require('../utils/auth');

async function loginUserWithEmailAndPassword(req) {
	const { email, name, password } = req.body;
	var user = undefined;
	if (email) {
		user = await userService.getUserByEmail(email);
	} else {
		user = await userService.getUserByName(name);
		// console.log('--->', user)
	}
	const isPasswordMatch = await decryptData(password, user.password);
	// console.log('--->', isPasswordMatch)

	if (!user || !isPasswordMatch) {
		throw new ApiError(
			httpStatus.UNAUTHORIZED,
			'Invalid email or password'
		);
	}

	delete user.password;

	return user;
}

module.exports = {
	loginUserWithEmailAndPassword,
};
