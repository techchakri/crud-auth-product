import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const auth = asyncHandler(async (req, res, next) => {
    let authHeader = req.headers.authorization

    if (!authHeader) {
        throw new ApiError(401, "unAuthorized")
    }

    const token = authHeader.replace("Bearer ", "")

    if (!token) {
        throw new ApiError(401, "unAuthorized")
    }

    const decodedValue = await jwt.verify(token, process.env.SECRET_ACCESS_TOKEN)

    req.user = {...decodedValue}

    next()

})

export {auth}