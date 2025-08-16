import { create } from "zustand";

export const usethemeStore = create((set:any)=>({
    theme:localStorage.getItem("chat-theme") || "light",
    // theme:localStorage.getItem("chat-theme") || "light",

    setTheme:(theme:string)=>{
        localStorage.setItem("chat-theme","light")
        set({theme})
    }
}))