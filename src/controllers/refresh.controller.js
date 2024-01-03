import jwt from "jsonwebtoken";
import { RefreshToken } from "../models/refresh.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

const refreshToken = asyncHandler(async (req, res) => {

    const refresh_token = await RefreshToken.findOne({ token: req.body.token })

    if (!refresh_token) {
        throw new ApiError(401, "Invalid refresh token")
    }

    const {id} = await jwt.verify(refresh_token.token, process.env.SECRET_REFRESH_TOKEN)

    const user = await User.findOne({ _id:id });

    if (!user) {
        throw new ApiError(401, "No user found!")
    }

    const secret_access_token = await user.generateAccessToken()
    const secret_refresh_token = await user.generateRefreshToken()

    await RefreshToken.create({ token: secret_refresh_token })

    return res
    .status(200)
    .json({
        secret_access_token,
        secret_refresh_token
    })


})

export {refreshToken}