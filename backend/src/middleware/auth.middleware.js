import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const protectedRoute = async(request,response,next)=>{
    try{
      const token = request.cookies.jwt // the name which we are giving initially previously we have given jwt 
      if (!token){
        return response.status(400).json({message:"Unauthorized -no token provided"})
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      if (!decoded){
        return response.status(400).json({message:"Unauthorized -token is invalid"})
      }

      const user = await User.findById(decoded.userId).select("-password")

      if (!user){
        return response.status(404).json({message:"User not found"})
      }
      request.user = user
      next()
    }
    catch(error){
        console.log("Error at protected Route",error.message)
        response.status(500).json({message:"Internal Server Error"})
    }
}