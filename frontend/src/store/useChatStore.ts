import { toast } from "react-toastify";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

interface UserTy{
    profilePic:string;
    _id:string;
    fullName:string
}




interface ChatState {
    messages:string[],
    users:UserTy[],
    selectedUser:UserTy | null,
    isUsersLoading:boolean,
    isMsgLoading:boolean,
}

// Define types for actions (methods)
interface ChatActions {
    getUsers:()=>Promise<void>;
    getMessages:(id:string)=>Promise<void>
    setSelectedUser:(setSelectedUser:UserTy)=>void

}


// Define the complete store type
type ChatTy = ChatState & ChatActions;



export const useChatStore = create<ChatTy>((set)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMsgLoading:false,


    getUsers:async()=>{
        debugger
        try{
            set({isUsersLoading:true})
            const response = await axiosInstance.get(`/messages/users`)
            set({messages:response.data})

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
    setSelectedUser:(selectedUser)=>set({selectedUser}),

}))