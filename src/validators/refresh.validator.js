import {z} from "zod"

const refreshSchema = z.object({
    token: z
    .string({
        required_error: "Token is required"
    })
    .trim()
})

export {refreshSchema}