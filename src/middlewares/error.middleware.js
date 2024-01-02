import { ApiError } from "../utils/ApiError.js"

const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || "BACKEND ERROR"
    const extraDetails = err.extraDetails || "Error from Backend"

    return res.status(status).json(new ApiError(status, message))
}

export default errorMiddleware