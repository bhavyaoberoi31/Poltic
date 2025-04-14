import mongoose from "mongoose";

const schema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    profileImage:{
         type:String  
    } , 
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    country: {
        type: String,
    }, 
    isVerified:{
         type:Boolean, 
         default:false
    }, 
    password:{
         type:String, 
         required:true 
    }, 
    hasBlueBadge:{
         type:Boolean, 
         default:false 
    }, 
    gender:{
         type:String 
    }, 
    location:{
         type:String 
    }
}, { timestamps: true })

 const User = mongoose.model('User' , schema) ; 
 export default User ; 
