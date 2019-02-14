const mongoose = require('mongoose');
require('dotenv').config()

mongoose.Promise = global.Promise;
module.exports=()=>{
    mongoose.connect(process.env.DB_HOST,{ useNewUrlParser: true });
    mongoose.set('useCreateIndex', true);
    //mongoose.connect('mongodb://localhost:27017');
    mongoose.connection.on('open',()=>{
        console.log('Connection OK');
    })
    mongoose.connection.on('error',(err)=>{
        console.log('Connection Fail',err);
    })
}