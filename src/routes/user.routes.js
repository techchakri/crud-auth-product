import express from "express"
import { login, me, register } from "../controllers/user.controllers.js"
import validate from "../middlewares/validate.middleware.js"
import { signinSchema, signupSchema } from "../validators/user.validator.js"
import { auth } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.route("/register").post(validate(signupSchema), register)
router.route("/login").post(validate(signinSchema), login)
router.route("/me").get(auth, me)

export default router