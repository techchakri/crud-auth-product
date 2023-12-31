import express from "express"
import userRouter from "./routes/user.routes"


const app = express()

// configure the routes
app.use("/api/user", userRouter)

export { app }