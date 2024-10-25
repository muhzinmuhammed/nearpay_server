import mongoose,{Schema,model} from 'mongoose'

const adminSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    adminEmail:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true

    },
    isAdmin:{
        type:Boolean,
        default:true
    }
},{timestamps:true})

const adminModel =new model("admin",adminSchema)
export default adminModel