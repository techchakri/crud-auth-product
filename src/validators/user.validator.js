import {z} from "zod"

// const regex = "^[a-zA-Z0-9]{8,100}"

// creating an signup object
const signupSchema = z.object({
    username: z
    .string({
        required_error: "Name is required"
    })
    .trim()
    .min(5, {message: "Name must be atleast 5 characters"})
    .max(100, {message: "Name must not be more than 100 characters"}),
    email: z
    .string({
        required_error: "Email is required"
    })
    .trim()
    .email({message: "Invalid email address"})
    .min(5, {message: "Email must be atleast 5 characters"})
    .max(100, {message: "Email must not be more than 100 characters"}),
    phone: z
    .string({
        required_error: "Phone is required"
    })
    .trim()
    .min(10, {message: "Phone must be atleast 10 characters"})
    .max(20, {message: "Phone must not be more than 20 characters"}),
    password: z
    .string({
        required_error: "Password is required"
    })
    .trim()
    .min(8, {message: "Password must be atleast of 8 characters"})
    .max(100, {message: "Password can't be greater than 100 characters"})
})

export {signupSchema}