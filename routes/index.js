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
  if(!password)
    res.json({message:"Password cant be empty",status:false})
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
