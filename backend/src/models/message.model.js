import mongoose from "mongoose"

const messageSchema = new mongoose.Schema(
    {
    senderId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    receiverId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    text:{type:String},
    image:{type:String}
    },
    {timestamps:true} // for adding createdat and updatedat feild into db
)

const Message  = mongoose.model("Message",messageSchema) // first char should in uppercase

export default Message