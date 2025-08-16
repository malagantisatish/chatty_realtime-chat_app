import express from "express"
import { getUserForSidebar,getMessages,sendMessage} from "../controllers/message.controllers.js"
import { protectedRoute } from "../middleware/auth.middleware.js"


const router = express.Router()

router.get("/users",protectedRoute,getUserForSidebar)
router.get("/:id",protectedRoute,getMessages)
router.post("/send/:id",protectedRoute,sendMessage)

export default router