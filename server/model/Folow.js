import mongoose from "mongoose";

const schema = mongoose.Schema({
     creatorId:{
         type:mongoose.Schema.Types.ObjectId , 
         ref:'User'
     }, 
     userId:{
         type:mongoose.Schema.Types.ObjectId , 
         ref:'User' 
     } 
} ,
 {timestamps:true } 
); 

const Follow = mongoose.model('Follow' , schema ) ; 

export default Follow ; 