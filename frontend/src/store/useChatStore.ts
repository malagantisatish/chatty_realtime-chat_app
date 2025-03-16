import { toast } from "react-toastify";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMsgLoading:false,


    getUsers:async()=>{
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
    }
}))