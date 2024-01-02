import { asyncHandler } from "../utils/asyncHandler.js";

export const register = asyncHandler((req, res) => {
    return res
    .status(200)
    .json({msg: "user registration successfull"})
})