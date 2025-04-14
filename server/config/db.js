import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config() ; 

console.log('this is mongo-uri' , process.env.MONGO_URI) ; 

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "Indore_hackathon",
          });
     console.log("Database connected successfully :)")
    } catch (error) {
     console.log("Error in Database connection---->" ,error)
    }
}
