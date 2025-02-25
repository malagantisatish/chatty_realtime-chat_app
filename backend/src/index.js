import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./lib/chatdb.js"
import authRoutes from "./routes/auth.route.js"
dotenv.config() // for accessing .env variables we need to import and config()

const app = express()

const PORT = process.env.PORT 

app.use(express.json()) // for destructuring json we need to do this

app.use("/api/auth",authRoutes)


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
    connectDB()
})