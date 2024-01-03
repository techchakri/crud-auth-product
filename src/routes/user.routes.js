import express from "express"
import { login, register } from "../controllers/user.controllers.js"
import validate from "../middlewares/validate.middleware.js"
import { signinSchema, signupSchema } from "../validators/user.validator.js"

const router = express.Router()

router.route("/register").post(validate(signupSchema), register)
router.route("/login").post(validate(signinSchema), login)

export default router