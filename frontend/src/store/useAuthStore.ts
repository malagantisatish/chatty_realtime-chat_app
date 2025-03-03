import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore =  create((set:any)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,

    checkAuth:async()=>{
        try{
        const response = await axiosInstance.get("/auth/check");
        set({authUser:response.data})

        }catch(error:any){
            console.log("error at checkAuth",error)
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    },
    signup:async()=>{
        
    }

}))