import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true  
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
    },
    phone:{
        type:Number,
    },
    address:{
        type:String,
    }
},{timestamps:true})


export const user = new mongoose.model('user',userSchema);