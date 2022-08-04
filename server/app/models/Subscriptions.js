const mongoose = require('mongoose')

const SunscriptionSchema = new mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    subscription_id : {
        type : String,
        required : true
    },
    activated_on: {
        type : Date,
        required : true
    },
    reniews_on : {
        type : Date,
        required : true
    },
    plan : {
        type : Number,
        required : true
    },
    renual : {
        type : Number,
        required : true   
    },
    activity_status:{
        type : Number,
        required : true ,
        default : 1 
    }
})

module.exports = mongoose.model('Subscription', SunscriptionSchema)