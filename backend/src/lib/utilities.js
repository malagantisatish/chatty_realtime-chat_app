import jwt from "jsonwebtoken"
export const generateToek = (userid,response)=>{
const token = jwt.sign({userid},process.env.JWT_SECRET,{
    expiresIn:"7d",

})
response.cookie("jwt",token,{
    maxAge:7*24*60*60*1000, // valid for 7 days
    httpOnly:true, // prevent xss attacks cross-site scripting attacks
    sameSite:"strict", // CSRF attacks cross-ste request forgery attacks
    secure:process.env.NODE_ENV !=="development" // for http and https
})
}
