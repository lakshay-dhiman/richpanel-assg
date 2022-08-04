const router = require('express').Router(); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

// import models
const User = require("../models/Users")

// import validations 
const {registration_validation} = require('../validations/registration_validation')
const {login_validation} = require("../validations/login_validation")

router.post('/register', async(req,res)=>{
    const data = req.body

    // validation error
    const {error} = registration_validation(data)
    if(error) return res.status(400).json({
        "error" : error.details[0].message
    })

    // check if user exists
    const emailExist = await User.findOne({email : data.email})
    if(emailExist) return res.status(400).json({
        "error" : "email already exists"
    })

    // no error found 

    // password encrypt
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(data.password,salt)

    // create user object
    const user = new User({
        name : data.name,
        email : data.email,
        password : hashedPassword,
    })
    


    try{
        const savedUser = await user.save()
        res.json({
            "_id" : savedUser.id,
            "name" : savedUser.name,
            "email" : savedUser.email,
        })
        
       

    }catch(err){
        res.status(400).send(err)
    }
})

router.post('/login', async(req,res) => {
    const data = req.body

    // validation error
    const {error} = login_validation(data)
    if(error) return res.status(400).json({
        "error" : error.details[0].message
    })

    // check if user exists
    const user = await User.findOne({email : data.email})
    if(!user) return res.status(400).json({
        "error" : "email does not exist"
    })

    // check is password is valid
    const validPassword = await bcrypt.compare(data.password, user.password)
    if(!validPassword) return res.status(400).json({
        "error" : "password incorrect"
    }) 

    if(validPassword){
        // jwt token created and sent
        const token = jwt.sign({ _id: user._id, role : user.role}, process.env.JWT_SECRETE)
        res.status(200).json({
            "_id" : user._id,
            "roll_number" : user.roll_number,
            "name" : user.name,
            "email" : user.email,
            "token" : token
        })
    }

})

module.exports = router