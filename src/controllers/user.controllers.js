import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {RefreshToken} from "../models/refresh.model.js";

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

    const access_token = await user.generateAccessToken()
    const refresh_token = await user.generateRefreshToken()

    await RefreshToken.create({ token: refresh_token })
    
    const userCreated = await User.findOne({_id:user._id}).select("-password")



    return res
    .status(200)
    .json(new ApiResponse(200, {user:userCreated, tokens: {access_token, refresh_token} }, "Registration completed Successfully"))
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

    const access_token = await userExists.generateAccessToken()
    const refresh_token = await userExists.generateRefreshToken()

    await RefreshToken.create({ token: refresh_token })

    const user = await User.findOne({ _id:userExists._id }).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200, {user, tokens: {access_token, refresh_token}}, "Login Successful"))
})

export const me = asyncHandler(async (req, res) => {
    const user = await User.findOne({ _id: req.user.id }).select("-password -updatedAt -__v")
    
    if (!user) {
        throw new ApiError(404, "404 Not Found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, user))
})