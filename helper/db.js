const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
module.exports=()=>{
    mongoose.connect('mongodb://travelAdmin:cloud.Server7@travellingserver1-shard-00-00-ms3gp.gcp.mongodb.net:27017,travellingserver1-shard-00-01-ms3gp.gcp.mongodb.net:27017,travellingserver1-shard-00-02-ms3gp.gcp.mongodb.net:27017/test?ssl=true&replicaSet=travellingserver1-shard-0&authSource=admin&retryWrites=true',{ useNewUrlParser: true });
    mongoose.set('useCreateIndex', true);
    //mongoose.connect('mongodb://localhost:27017');
    mongoose.connection.on('open',()=>{
        console.log('Connection OK');
    })
    mongoose.connection.on('error',(err)=>{
        console.log('Connection Fail',err);
    })
}