// ESM syntax is supported.
import express from "express"
import dotenv from "dotenv"

const app = express()
dotenv.config()

const {PORT} = process.env

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})

export {}