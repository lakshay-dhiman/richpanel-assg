const Joi = require('@hapi/joi')

const registration_validation = (data)=>{
    const schema =  Joi.object({
        name : Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })

    return schema.validate(data)
}


module.exports.registration_validation = registration_validation;