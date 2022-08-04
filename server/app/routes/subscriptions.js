const router = require('express').Router(); 
const Subscription = require('../models/Subscriptions');
const { route } = require('./payments');
const stripe = require('stripe')(process.env.SECRETE_KEY);

router.post("/show_subscription",async (req,res) => {
    const {user_id} = req.body

    const subscription = await Subscription.findOne({
        user_id : user_id
    })

    return res.json(subscription)

})

router.post("/cancel_subscription", async(req,res) => {
    const {sub_id} = req.body

    try{
        const del_sub = await stripe.subscriptions.del(sub_id);
        try{
            const subscription = await Subscription.findOneAndUpdate({
                subscription_id : sub_id
            },{
                activity_status : 0
            })
            
            const updated = await Subscription.findOne({
                subscription_id : sub_id
            })

            res.json(updated)

        }catch(err){
            console.log(err);
        }

    }catch(err){
        console.log(err);
    }



})

module.exports = router