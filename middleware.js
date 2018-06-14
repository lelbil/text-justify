const joi = require('joi')
const jwt = require('jsonwebtoken')

const { User } = require('./db')

const registerBodySchema = joi.object().keys({
    email: joi.string().email().required(),
})

exports.validateBody = (req, res, next) => {
    joi.validate(req.body, registerBodySchema, {abortEarly: false}, errors => {
        if (errors) {
            res.status(400).json(errors)
        }
        else next()
    })
}

exports.verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token']
//TODO: change
    const { email } = jwt.verify(token, process.env.SECRET || 'changeThis')

    req.verifiedJWTEmail = email
    next()
}

exports.doesUserExist = async (req, res, next) => {
    const email = req.body.email || req.verifiedJWTEmail
    const user = await User.findOne({ email })

    if (!user) {
        if (req.verifiedJWTEmail) {
            return res.status(401).json("Unkown user")
        }
        return res.status(404).json("User doesn't exist, please register")
    }

    req.userObject = user
    next()
}

exports.limitRate = (req, res, next) => {
    exports.doesUserExist(req, res, () => {
        const { userObject } = req

        if (userObject.remaining < 0) {
            return res.status(402).json("You have exceeded your API calling rate!")
        }
        next()
    })

}
