import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        email:{type:String,required:true,unique:true},
        fullName:{type:String,required:true},
        password:{type:String,required:true,minlength:6},
        profilePic:{type:String,default:""},
    },
    {timestamps:true} // for adding createdat and updatedat feild into db
)

const User  = mongoose.model("User",userSchema) // first char should in uppercase

export default User