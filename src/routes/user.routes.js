import express from "express"
import { login, me, register } from "../controllers/user.controllers.js"
import validate from "../middlewares/validate.middleware.js"
import { signinSchema, signupSchema } from "../validators/user.validator.js"
import { auth } from "../middlewares/auth.middleware.js"
import { refreshSchema } from "../validators/refresh.validator.js"
import { refreshToken } from "../controllers/refresh.controller.js"

const router = express.Router()

router.route("/register").post(validate(signupSchema), register)
router.route("/login").post(validate(signinSchema), login)
router.route("/me").get(auth, me)
router.route("/refresh-token").post(validate(refreshSchema), refreshToken)

export default router