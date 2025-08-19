import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./lib/chatdb.js"
import authRoutes from "./routes/auth.route.js"
import messageRoute from "./routes/messageRoute.route.js"
import cookieParser from "cookie-parser"
import cors from "cors";
import {app,server} from "./lib/socket.js"
import path from "path";

dotenv.config() // for accessing .env variables we need to import and config()

const PORT = process.env.PORT 
const _dirname = path.resolve()

app.use(express.json()) // for destructuring json we need to do this
app.use(cookieParser())

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}
))




app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoute)

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(_dirname,"../fronted/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(_dirname,"../frontend","dist","index.html"));
    })
}


server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
    connectDB()
})