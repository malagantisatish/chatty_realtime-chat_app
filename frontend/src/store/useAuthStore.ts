import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import { FormTy, LoginFormTy } from "../Const";

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
    signup:async(data:FormTy)=>{
      try{
        const response = await axiosInstance.post("/auth/signup",data)
        if (response.status===201){
            set({authUser:response.data})
            toast.success("Account created Successfully",{toastId:"signupSuccess"})
        }
      }catch(error:any){
        toast.error(error.response.data.message,{toastId:"Error msg"})
      }finally{
        set({isSigningUp:false})
      }
    },
    login:async(data:LoginFormTy)=>{
      try{
        const response = await axiosInstance.post("/auth/login",data)
        if (response.status===201){
            set({authUser:response.data})
            toast.success("Login Successfully",{toastId:"login success"})
        }
      }catch(error:any){
        toast.error(error.response.data.message,{toastId:"Error msg"})
      }finally{
        set({isSigningUp:false})
      }
    },
    logout:async()=>{
        try{
          await axiosInstance.post("/auth/logout")
          set({authUser:null})
              toast.success("Logged out Successfully",{toastId:"loggout"})
        }catch(error:any){
          toast.error(error.response.data.message,{toastId:"Error msg"})
        }finally{
          set({isSigningUp:false})
        }
      }

}))