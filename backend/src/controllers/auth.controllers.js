import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import  {generateToken} from "../lib/utilities.js"
import cloudinary from "../lib/cloudinary.js"

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
      // checking weather user is exists or not vx 
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

      (newUser)

      if (newUser){
        // generating jwt token for authentication 
        generateToken(newUser._id,response)
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

export const login = async(reqest,response)=>{
  const {email,password} = reqest.body
  try{

    const user = await User.findOne({email})
    if (!user){
      return response.status(404).json({message:"Invalid Credentials"})
    }
    const isPasswordCorrect = await bcrypt.compare(password,user.password)
    if (!isPasswordCorrect){
      return response.status(400).json({message:"Invalid Credentials"})
    }

    generateToken(user._id,response)
    response.status(200).json({
      _id:user._id,
      fullName:user.fullName,
      email:user.email,
      profilePic:user.profilePic

    })
    }catch(error){
    console.log("Error in login controller",error.message)
    response.status(500).json({message:"Internal server Error"})
  }
}

export const logout = async(reqest,response)=>{
    try{
      response.cookie("jwt","",{maxAge:0})
      response.status(200).json({message:"Logged out Successfully"})
    }
    catch(error){
      console.log("error at logout controller",error.message)
     response.status(500).json({message:"Internal Server Error"})
    }
}

export const updateProfile = async(request,response)=>{
  try{
    const {profilePic} = request.body
    const userid = request.user._id
    if (!profilePic){
      return  response.status(400).json({message:"Profile picture is required"})
    }

   const upload =  await cloudinary.uploader.upload(profilePic)
    const updatedUser = await User.findByIdAndUpdate(userid,
      {profilePic:upload.secure_url},{new:true})  /*uploadResponse.secure_url*/
   response.status(200).json({
    "_id": updatedUser._id,
    "email": updatedUser.email,
    "fullName": updatedUser.fullName,
    "profilePic": updatedUser.profilePic,
    "createdAt": updatedUser.createdAt,
    "updatedAt": updatedUser.updatedAt,
    "__v": updatedUser.__v
   })


  }catch(error){
    console.log("error at profile update controller",error.message)
    response.status(500).json({message:"Internal Server Error"})
  }
}


export const checkAuth = async(request,response)=>{
  // console.log("reqest",request)
  try{
    response.status(200).json(request.user)

  }catch(error){
    console.log("error at checkauth controller",error.message)
    response.status(500).json({message:"Internal Server Error"})
  }
}