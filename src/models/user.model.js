import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unqiue: true,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},
{timestamps: true})

// secure the password with the bcrypt
userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) next()

    try {
        const saltRound = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, saltRound)
        next()
    } catch (error) {
        next(error)
    }
})

// json web token
userSchema.methods.generateAccessToken = async function() {
    try {
        return jwt.sign({
            id: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin
        },
        process.env.SECRET_ACCESS_TOKEN,
        {
            expiresIn: "1h"
        }
        )
    } catch (error) {
        console.log(error)
    }
}

// compare the password
userSchema.methods.isPasswordCorrect = async function(password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        console.log(error)
    }
}

export const User = mongoose.model("User", userSchema)