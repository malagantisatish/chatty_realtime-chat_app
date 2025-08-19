import { toast } from "react-toastify";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

interface UserTy{
    profilePic:string;
    _id:string;
    fullName:string
}

export interface messagesTy {
  _id: string
  senderId: string
  receiverId: string
  text: string
  createdAt: string
  updatedAt: string
  __v: number
  image?: string
}




interface ChatState {
    messages:messagesTy[],
    users:UserTy[],
    selectedUser:UserTy | null,
    isUsersLoading:boolean,
    isMsgLoading:boolean,
}

// Define types for actions (methods)
interface ChatActions {
    getUsers:()=>Promise<void>;
    getMessages:(id:string)=>Promise<void>
    setSelectedUser:(setSelectedUser:UserTy|null)=>void;
    sendMessages:(messageData:MessageReqBody)=>Promise<void>;
    subscribeToMessage:()=>void;
    unSubscribeToMessage:()=>void;

}

interface MessageReqBody{
    text:string;
    image?:string | undefined
}


// Define the complete store type
type ChatTy = ChatState & ChatActions;



export const useChatStore = create<ChatTy>((set,get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMsgLoading:false,


    getUsers:async()=>{
        try{
            set({isUsersLoading:true})
            const response = await axiosInstance.get(`/messages/users`)
            set({users:response.data})

        }catch(err:any){
            toast.error(err.response.data.messages)

        }finally{
            set({isUsersLoading:false})
        }
    },
    getMessages:async(userid:string)=>{
        try{
            set({isMsgLoading:true})
            const response = await axiosInstance.get(`/messages/${userid}`)
            set({messages:response.data})

        }catch(err:any){
            toast.error(err.response.data.messages)
        }finally{
            set({isMsgLoading:false})
        }
    },
    sendMessages:async(reqBody:MessageReqBody)=>{
          const {selectedUser,messages} = get();
          try{
            const response = await axiosInstance.post(`/messages/send/${selectedUser?._id}`,reqBody);
            set({messages:[...messages,response.data]})

          }catch(err:any){
              toast.error(err.response.data.message);
          }
    },
    subscribeToMessage:()=>{
       const {selectedUser} = get()
       if(!selectedUser)return 
       const socket = useAuthStore.getState().socket;
       socket.on("newMessage",(newMessage:messagesTy)=>{
        const isMessageFromSelectedUser = newMessage.receiverId!==selectedUser._id
        if(!isMessageFromSelectedUser)return
        set({
            messages:[...get().messages,newMessage]
        })
       })
    },
    unSubscribeToMessage:()=>{
       const socket = useAuthStore.getState().socket;
       socket.off("newMessage")

    }
    ,
    setSelectedUser:(selectedUser)=>set({selectedUser}),
     

}))