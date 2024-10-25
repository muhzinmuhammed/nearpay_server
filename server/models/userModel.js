import mongoose,{Schema,model} from 'mongoose'

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    userEmail:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true

    },
    score:{
        type:Number,
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const userModel =new model("users",userSchema)
export default userModel