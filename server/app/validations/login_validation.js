const Joi = require('@hapi/joi')


const login_validation = (data)=>{
    const schema =  Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data)
}


module.exports.login_validation = login_validation;