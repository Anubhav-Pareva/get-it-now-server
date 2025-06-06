import { model, Schema } from "mongoose";
const UserSchema = new Schema({
    name:{
        type:String,
        required:true,        
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
    },
    address:{
        type:Array,

    },
    referralCode:{
        type:String,
        requireg:true,
    },
    referBy:{
        type:String,
        default:null,
    },
    subscribeStatus:{
        type:Boolean,
        default:false,
    },
    subscribePlan:{
        type:String,
        default:null,
    },
    DOB:{
        type:Date,
        default:null
    }
},{
    collection:"user-data"
});
const UserModel = model("user", UserSchema);
export default UserModel;

