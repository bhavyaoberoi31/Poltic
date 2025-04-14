import mongoose from "mongoose";

const  schema = mongoose.Schema({
     video:{
         type:String ,
         required:true , 
     }, 

     title:{
         type:String , 
         required:true  
     }, 
     description:{
         type:String , 
         required:true 
     }, 
     thumbnail:{
         type:String , 
         required:false 
     }, 
     userId:{
         type:mongoose.Schema.Types.ObjectId , 
         ref: 'User',
         required:true
     }, 
     isDown:{
         type:Boolean , 
         default:false 
     }
} ,

 {timestamps:true}

) ; 

const Reels = mongoose.model('Reels' , schema) ; 
export default Reels ; 