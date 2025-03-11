import { create } from "zustand";

export const usethemeStore = create((set:any)=>({
    theme:localStorage.getItem("chat-theme")||"coffee",

    setTheme:(theme:string)=>{
        debugger
        set({theme})
    }
}))