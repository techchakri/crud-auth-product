// ESM syntax is supported.
import dotenv from "dotenv"
import {app} from "./app"
import connectDB from "./db"

dotenv.config()

const {PORT} = process.env


connectDB()
// .then(() => {
//     app.listen(PORT, () => {
//         console.log(`Server is running on port: ${PORT}`)
//     })
// })
// .catch((err) => {
//     console.log("MongoDB connection failed!!", err)
// })

export {}