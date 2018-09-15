const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username:{
        type:String,
		required: [true,"This are must be fill"],
        unique:[true,"This username taken before. Please write another"]
    },
    name:{
		type: String,
		required: [true,"This are must be fill"]
	},
    lastName:{
		type: String,
		required: [true,"This are must be fill"]
	},
	password:{
		type:String,
		required:true
	},
	age:String,
	sex:String,
	email: {
		type:String,
		unique:true,
		required:true
	},
	country:{
		type:String,
	},
    public:{
        type:Boolean,
    },
    profilePhoto:{
        type:String,
        default:'default.jpg'
    },
    createdDate:{
        type:Date,
        default:Date.now
    },
	travelledLocations:[{
		lat: String,
		lng: String,
		stars: String,
		lastTravellingTime:Date,
	}],
	travellingPoint:{
		type:Number,
		default:0
	}
})

module.exports = mongoose.model('user',UserSchema);