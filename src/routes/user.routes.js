import express from "express"
import { register } from "../controllers/user.controllers.js"
import validate from "../middlewares/validate.middleware.js"
import { signupSchema } from "../validators/user.validator.js"

const router = express.Router()

router.route("/register").post(validate(signupSchema), register)


export default router