const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


router.get('/',(req,res,next)=>{
  const promise = User.find({})
  promise.then((data) => {
    if(!data)
    next({message:'no',code:5})
		res.json(data);
	}).catch((err) => {
		res.json(err);
	})
})
//User Find

router.post('/auth', (req, res) => {
	const { username, password } = req.body;

	User.findOne({
		username
	}, (err, user) => {
		if (err)
			throw err;

		if(!user){
			res.json({
				status: false,
				message: "The username wasn't found"
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
						message: "The password that you've entered is incorrect"
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
						token
					})
				}
			});
		}
	});
});

//User Delete
router.delete('/delete/:id',(req,res)=>{
  const promise = User.findByIdAndRemove(req.params.id)
  promise.then((count)=>{
    if(count==null)
      res.json({status:'0'})//zaten silinmiş ise 0
    res.json({status:'1'})
  }).catch((err)=>{
    res.json(err)
  })
})

module.exports = router;