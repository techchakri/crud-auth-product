// ESM syntax is supported.
import dotenv from "dotenv"
import {app} from "./app.js"
import connectDB from "./db/index.js"

// configure the 'dotenv'
dotenv.config()

const {PORT} = process.env

connectDB()
.then(() => {
    app.listen(PORT || 8000, () => {
        console.log(`\n Server is running on port: ${PORT}`)
    })
})
.catch((err) => {
    console.log("MongoDB connection failed!!", err)
})