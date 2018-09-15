const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
module.exports=()=>{
    mongoose.connect('mongodb://admin:123456Ml@ds149682.mlab.com:49682/travel');
    //mongoose.connect('mongodb://localhost:27017');
    mongoose.connection.on('open',()=>{
        console.log('Connection OK');
    })
    mongoose.connection.on('error',(err)=>{
        console.log('Connection Fail',err);
    })
}