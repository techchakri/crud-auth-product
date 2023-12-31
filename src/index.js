// ESM syntax is supported.
import dotenv from "dotenv"
import {app} from "./app.js"
import connectDB from "./db/index.js"

dotenv.config()

const {PORT} = process.env

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`\n Server is running on port: ${PORT}`)
    })
})
.catch((err) => {
    console.log("MongoDB connection failed!!", err)
})

    // app.listen(PORT, () => {
    //     console.log(`Server is running on port: ${PORT}`)
    // })

export {}