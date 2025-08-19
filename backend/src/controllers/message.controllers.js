import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getRecevierSocketId, io } from "../lib/socket.js";

export const getUserForSidebar = async(request,response)=>{
    try{
        const loggedInUserId = request.user._id;
        const filteredUsers = await User.find({id:{$ne:loggedInUserId}}).select("-password"); // getting userlist other than loggedin user and remoing password from it
        response.status(200).json(filteredUsers)
    }catch(error){
        console.log("Error at getUserForSidebar",error.message)
       response.status(500).json({error:"Internal server error"})
    }
}

export const getMessages = async(request,response)=>{
    try{
        const {id:receiverChatId} = request.params 
        const senderId = request.user._id
        const messages = await Message.find({ 
            $or:[{senderId:senderId,receiverId:receiverChatId},
                {senderId:receiverChatId,receiverId:senderId}
            ]

        })
        // for getting both users chat sender and receiver
        response.status(200).json(messages)

    }catch(error){
        console.log("Error at getUserForSidebar",error.message)
        response.status(500).json({error:"Internal server error"})
    }
}


export const sendMessage = async(request,response)=>{
    try{
        const {text,image} = request.body 
        const {id:receiverId} = request.params 
        const senderId = request.user._id 
        let imageUrl;
        if (image){
            // upload base64 image to  cloudinary 
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl
        })

        await newMessage.save()
        const recevierSocketId = getRecevierSocketId(receiverId);
        if(recevierSocketId){
            io.to(recevierSocketId).emit("newMessage",newMessage) // for sending new message specific user
        }

        response.status(201).json(newMessage)

    }
    catch(error){
        console.log("Error at sendMessage",error.message)
        response.status(500).json({error:"Internal server error"})
    }
}