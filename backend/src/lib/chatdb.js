// db.js
import mongoose from "mongoose"

export const connectDB = async() => {
   try{
   const conect =  await mongoose.connect(process.env.MONGOOSEPORT) //connecting db
   console.log(`mongodb connected: ${conect.connection.host}`)

   }
   catch(err){
    console.log(`mongodb connected error: ${error}`)
   }
}