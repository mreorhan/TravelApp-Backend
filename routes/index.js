const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Contact = require('../models/Contact');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TravelApi',details: 'All rights reserved',author:'@mreorhan' });
});

//contact
router.post('/contact',(req,res)=>{
  const {id,details,system,version} = req.body;
  const contact = new Contact({
    id,
    details,
    system,
    version
  })
  contact.save((err,data)=>{
    if(err){
      res.json({message:err,status:false})}
    res.json(data)
  })
})



router.post('/register',(req,res)=>{
  const {username,name,lastName,sex,email,country,password,lat,lng} = req.body;
  //password hashleme kısmı ->
  User.findOne({
		username
	}, (err, user) => {
		if (err)
			throw err;

		if(user){
			res.json({
				status: false,
        code:2
			});
        }
  else if(!password)
    res.json({status:false,code:4})
  else{
    bcrypt.hash(password ,10).then((hash)=>{
        const user = new User({
            username,
            name,
            lastName,
            sex,
            email,
            lat,
            lng,
            country,
            password:hash,
        })
    user.save((err,data)=>{
      if(err===""){
      if(err.name === 'MongoError' && err.code === 11000)
        res.json({message:1,status:false,code:1})
      else if(data!==null)
        res.json(data)
      }
      res.json(data)
    })
  })

}
     	});
});
module.exports = router;
