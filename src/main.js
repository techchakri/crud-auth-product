// ESM syntax is supported.
import express from "express"
import dotenv from "dotenv"
import userRouter from "./routes/user.routes"

const app = express()
dotenv.config()

const {PORT} = process.env

app.use("/api/user", userRouter)


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})

export {}