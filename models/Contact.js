const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const ContactSchema = new Schema({
    id:{
        type:String,
		required: [true,"This are must be fill"],
    },
    details:{
		type: String,
		required: [true,"This are must be fill"]
	},
    system:{
		type: String,
		required: [true,"This are must be fill"]
	},
	version:{
		type:String,
		required: [true,"This are must be fill"]
	},
	date:{
		type:Date,
		default: Date.now
	}
})

module.exports = mongoose.model('contact',ContactSchema);