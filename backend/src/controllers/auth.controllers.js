import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
export const signup = async(reqest,response)=>{
    const {fullName,email,password} = reqest.body
   try{
    // checking all field are entered or not 
    if (!fullName || !email || !password){
      return response.status(400).json({message:"All field are required"})
    }
    // checking password length
      if (password.length<6){
        return response.status(400).json({message:"Password must be at least 6 characters"})
      }
      // checking weather user is exists or not
      const user = await User.findOne({email})
      if (user){
        return response.status(400).json({message:"Email is already exists"})
      }

      // hashing password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password,salt)
      // creating a new user
      const newUser = new User({
        fullName:fullName,
        email:email,
        password:hashedPassword
      })

      if (newUser){
        // generating jwt token for authentication 
        generateToken(newUser._id)
        await newUser.save()
        response.status(201).json({
          _id:newUser._id,
          fullName:newUser.fullName,
          email:newUser.email,
          profilePic:newUser.profilePic
        })
        
      }
      else{
        return response.status(400).json({message:"Invalid user data"})
      }
   }
   catch(error){
    console.log("Error in signup controller",error.message)
    return response.status(400).json({message:"Internal Server Error"})
   }
}

export const login = (reqest,response)=>{
    response.send("login route")
}

export const logout = (reqest,response)=>{
    response.send("logout route")
}