import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import { FormTy, LoginFormTy } from "../Const";


interface AuthState {
  authUser: FormTy | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  onlineUsers:string[]
}

// Define types for actions (methods)
interface AuthActions {
  checkAuth: () => Promise<void>;
  signup: (data: FormTy) => Promise<void>;
  login: (data: LoginFormTy) => Promise<void>;
  logout: () => Promise<void>;
  profileUpdate: (profilePic: string | ArrayBuffer | null) => Promise<void>;
}


// Define the complete store type
type AuthStore = AuthState & AuthActions;


export const useAuthStore =  create<AuthStore>((set)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers:[],

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
      set({isSigningUp:true})
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
      debugger
      set({isLoggingIn:true})
      try{
        const response = await axiosInstance.post("/auth/login",data)
        if (response.status===200){
            set({authUser:response.data})
            toast.success("Login Successfully",{toastId:"login success"})
        }
      }catch(error:any){
        toast.error(error.response.data.message,{toastId:"Error msg"})
      }finally{
        set({isLoggingIn:false})
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
      },
    profileUpdate:async(data:any)=>{
      set({isUpdatingProfile:true})
      try{
        const response =  await axiosInstance.put("/auth/update-profile",data)

      }catch(error:any){
        toast.error(error.response.data.message,{toastId:"Error Mesg"})

      }finally{
        set({isUpdatingProfile:false})
      }
    }  

}))