import mongoose from "mongoose";

const schema= new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    last_name:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'user'
    },
    avatar:{
        type:String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png'
    },
    carrito:{
        type: Array,
        default: []
    }
}) 

const userModel= mongoose.model('users', schema)

export default userModel