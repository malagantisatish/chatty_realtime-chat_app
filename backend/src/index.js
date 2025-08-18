import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./lib/chatdb.js"
import authRoutes from "./routes/auth.route.js"
import messageRoute from "./routes/messageRoute.route.js"
import cookieParser from "cookie-parser"
import cors from "cors";
import {app,server} from "./lib/socket.js"

dotenv.config() // for accessing .env variables we need to import and config()

const PORT = process.env.PORT 

app.use(express.json()) // for destructuring json we need to do this
app.use(cookieParser())

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}
))




app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoute)


server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
    connectDB()
})