const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


router.post('/', (req, res) => {
	const { username, password } = req.body;

	User.findOne({
		username
	}, (err, user) => {
		if (err)
			throw err;

		if(!user){
			res.json({
				status: false,
				message: 'User not found.'
			});
        }
        else if(!password){
            res.json({
				status: false,
				message: "The password can't be empty"
			});
        }
        else{
			bcrypt.compare(password, user.password).then((result) => {
				if (!result){
					res.json({
						status: false,
						message: "The password is incorrect"
					});
				}else{
					const payload = {
						username
					};
					const token = jwt.sign(payload, req.app.get('api_secret_key'), {
						expiresIn: 720 // 12 saat
					});

					res.json({
						status: true,
						token,
						user
					})
				}
			});
		}
	});
});

module.exports = router;