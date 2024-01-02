import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"

export const register = asyncHandler(async (req, res) => {

    const {username, email, phone, password} = req.body

    const userExists = await User.findOne({$or: [{username},{email}]})

    if (userExists) {
        throw new ApiError(409, "username or email is already exists")
    }

    const user = await User.create({
        username,
        email,
        phone,
        password
    })

    return res
    .status(200)
    .json(new ApiResponse(200, {user,token:await user.generateAccessToken()}, "Registration completed Successfully"))
})