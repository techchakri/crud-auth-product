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
    
    const userCreated = await User.findOne({_id:user._id}).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200, {user:userCreated, token:await user.generateAccessToken()}, "Registration completed Successfully"))
})

export const login = asyncHandler(async (req, res) => {

    const {email, password} = req.body

    const userExists = await User.findOne({ email })

    if (!userExists) {
        throw new ApiError(401, "email or password is wrong")
    }

    const isPassword = await userExists.isPasswordCorrect(password)

    if (!isPassword) {
        throw new ApiError(401, "password is wrong")
    }

    const user = await User.findOne({ _id:userExists._id }).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200, {user, token: await userExists.generateAccessToken()}, "Login Successful"))
})

export const me = asyncHandler(async (req, res) => {
    const user = await User.findOne({ _id: req.user.id })
    
})