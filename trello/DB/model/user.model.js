import mongoose,{Schema,model} from "mongoose";
const UserSchema =new Schema({
    FirstName:String,
    LastName:String,
    userName:{
        type:String,
        required:true,
        lowercase:true,
    },
    email:{
        type:String,
        uniqe:true,
        required:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    age:Number,
    gender:{
        type:String,
        enum:['female','male','Not specified'],
        default:'Not specified'
    },
    phone:String,
    tokens:[{
        type:String,
        required:true
    }],
    confirmEmail:{
        type:Boolean,
        default:false
    },
    profilephoto:{secure_url:String,public_id:String},
    coverphoto:[{secure_url:String,public_id:String}],
},{timestamps:true})

export const UserModel=mongoose.model('User',UserSchema)