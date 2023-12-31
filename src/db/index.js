import mongoose from "mongoose"

const {DB_URL,DB_NAME} = process.env
console.log(DB_NAME,DB_URL)

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${DB_URL}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MongoDB connection FAILED ", error)
        process.exit(1)
    }
}

export default connectDB