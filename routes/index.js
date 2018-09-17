const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TravelApi',details: 'All rights reserved',author:'@mreorhan' });
});



router.post('/register',(req,res)=>{
  const {username,name,lastName,sex,email,country,password} = req.body;
  //password hashleme kısmı ->
  
  if(username && email){
	  User.findOne({
		username
	}, (err, user) => {
		if (err)
			throw err;

		if(user){
			res.json({
				message: 'This username has been taken. Please choose a different username.',
				status: false
			});
        }
	})
	
	  User.findOne({
		email
	}, (err, email) => {
		if (err)
			throw err;

		if(email){
			res.json({
				message: 'This e-mail has been taken. Please choose a different e-mail.',
				status: false
			});
        }
	})
  }

  if(!password || !username || !name || !lastName || !email)
    res.json({message:"All fields must be filled",status:false})
  else{
	  
	  
	  
    bcrypt.hash(password ,10).then((hash)=>{
        const user = new User({
            username,
            name,
            lastName,
            sex,
            email,
            country,
            password:hash
        })
    user.save((err,data)=>{
      if(err){
        res.json({message:err,status:false})}
      res.json(data)
    })
  })

}
      
})
module.exports = router;

