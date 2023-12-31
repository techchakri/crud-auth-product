import express from "express"
import { register } from "../controllers/user.controllers.js"

const router = express.Router()

router.route("/register").get(register)

export default router