const joi = require('joi')

const validator = (req, res, next) => {  

    const schema = joi.object({
        userName: joi.string().max(12).min(3).trim().pattern(new RegExp('[a-zA-Z]')).required().messages({
            'string.min': 'The name must have more than three letters',
            'string.max': 'The name must have less than twelve letters',
            'string.empty': 'At least one name is required',
            'string.pattern.base': 'The name can only have letters'
        }),
        lastName: joi.string().max(16).min(3).required().trim().pattern(new RegExp('[a-zA-Z]')).messages({
            'string.min': 'The lastname must have more than three letters',
            'string.max': 'The lastname must have less than sixteen letters',
            'string.empty': 'At least one name is required',
            'string.pattern.base': 'The name can only have letters' 
        }),
        password: joi.string().required().min(8).trim().messages({
            'string.min': 'The password must have at least eight characters',
            'string.max': 'The password must have less than sixteen characters',
            'string.empty': 'The password is required',
        }),
        email: joi.string().required().email().trim().messages({
            'string.empty': 'An email is required',
            'string.email': 'A valid format of email is required',
        }),
        imgUrl: joi.string(),
        country: joi.string().required(),
        googleFlag: joi.boolean()
    })
    const validation = schema.validate(req.body, { abortEarly: false })
    if (validation.error) {
        return res.json({ success: false, answer: validation.error.details })
    }
    next()
}
module.exports = validator