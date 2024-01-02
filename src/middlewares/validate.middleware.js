const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body)
        req.body = parseBody
        // console.log(req.body)
        next()
    } catch (error) {
        const status = 422
        const message = error.issues[0].message
        // console.log(error)
        next({status,message})
    }
}

export default validate