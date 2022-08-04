const router = require('express').Router(); 
const { custom } = require('@hapi/joi');
const Stripe = require('stripe');
const mongoose = require('mongoose')
const Subscription = require('../models/Subscriptions');


router.post("/subscribe", async (req,res) => {
    const {source,plan,user}  = req.body
    const stripe = new Stripe(process.env.SECRETE_KEY);

    const sub = await Subscription.findOne({
        user_id : user.user_id
    })

    if(sub){
        if(sub.activity_status==1){
            res.sendStatus("you already have a subscription")
        }
        else{
            await Subscription.deleteOne({
                user_id : user.user_id
            })
        }
    }

    allPlans = {
        0 : {
            1 : "price_1LSjKoSAgc7vhbhQpQCBuyw2",
            0 : "price_1LSjKoSAgc7vhbhQc971AqjA"
        },
        1 : {
            1 : "price_1LSjIhSAgc7vhbhQpmo8yGFf",
            0 : "price_1LSjIhSAgc7vhbhQXnjFhnpG"
        },
        2 : {
            1 : "price_1LSlx0SAgc7vhbhQbtAnAaGe",
            0 : "price_1LSlx0SAgc7vhbhQgq9a9OLg"
        },
        3 : {
            1 : "price_1LSjLiSAgc7vhbhQTQZYPMLA",
            0 : "price_1LSjLiSAgc7vhbhQlm6VWq8s"
        }
    }

    var name = user.user_name, user_id = user.user_id , price = allPlans[plan.type][plan.rec]

    try{
        const customer = await stripe.customers.create({
            source : source,
            name : name,
        })

        try{

            const subscriptions = await stripe.subscriptions.create({
                customer : customer.id,
                default_source : source,
                items : [
                    {price : price}
                ],
                expand : ["latest_invoice.payment_intent"]
            }) 
            if(subscriptions.status == 'active'){
                // success

                const id = subscriptions.id, 
                user_id = user.user_id, 
                plan_id = plan.type, 
                rec_id = plan.rec,
                start_date = new Date()
                var end_date = new Date()
                
                if(subscriptions.plan.interval == 'month'){
                    end_date = new Date(end_date.setMonth(end_date.getMonth()+1));    
                }else  if(subscriptions.plan.interval == 'year'){
                    end_date = new Date(end_date.setFullYear(end_date.getFullYear()+1)); 
                }
                const subscription = new Subscription({
                    user_id : user_id,
                    subscription_id : id,
                    activated_on : start_date,
                    reniews_on : end_date,
                    plan : plan_id,
                    renual : rec_id
                })

                try{
                    const createdSubscription = await subscription.save()
                    return res.send('successfully subscribed')
                }catch(err){
                    console.log(err);
                    return res.status(400).json({
                        "error" : "something went wrong"
                    }) 
                }
            }else{
                // cancle subscription
                // and send error
                return res.status(400).json({
                    "error" : "something went wrong"
                }) 
            }

            
        }catch(err){
            console.log(err);
            return res.status(400).json({
                "error" : "something went wrong"
            })            
        }


    }catch(err){
        return res.status(400).json({
            "error" : "something went wrong"
        })
    }








    res.send('1')
})

module.exports = router