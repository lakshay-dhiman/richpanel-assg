<template>
    <div class="wrapper-main">
        <div class="plan_details" v-if="nosub == false">
            <div class="plan_activity">
                <div class="active">
                    <h2>Current Plan Details</h2>
                    <div :class="activity_status">{{activity_status}}</div>
                </div>

                <a class="cancel" @click="cancelsub" v-if="activity_status == 'active'">Cancel</a>
            </div>
            <div class="plan-name-price">
                <div class="name">{{plan_name}}</div>
                <div class="devices">{{devices}}</div>
                <div class="price">&#8377; {{price}}</div>
            </div>
            <button v-if="activity_status == 'canceled'" @click="gotoaccount">Get Subscription</button>
            <div class="note">
                <p v-if="activity_status == 'active'">Your subscription has started on {{start}} and will auto renew on {{end}}</p>
                <p v-if="activity_status == 'canceled'">Your subscription was cancelled and you will loose access to services on {{end}}</p>
            </div>
        </div>
        <div class="nosubs" v-if="nosub == true">
            <h1>No sibscriptions yet</h1>
            <button @click="gotoaccount">Get a subscription</button>
        </div>
    </div>
</template>

<script>
    export default{
        data() {
            return {
                plan_name : null,
                devices : null,
                price : null,
                start : null,
                end : null,
                activity_status : null,
                subscription_id : null,
                nosub : false
            }
        },
        async mounted() {
            const subs = await fetch(`${process.env.VUE_APP_BASE}/api/subscriptions/show_subscription`,{
                method : 'post',
                headers:{
                    "Access-Control-Allow-Origin": '*',
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                     "user_id" : localStorage.getItem("user_id")
                })
            })

            const subscription = await subs.json()
            if(!subscription){
                this.nosub = true
            }
            else{
                var plan = subscription.plan
                var rec = subscription.renual
                switch (plan) {
                    case 0:
                        this.plan_name = "Mobile"
                        this.devices = "Phone + Tablet"
                        this.price = rec == 1 ? "100/mo" : "1000/yr"
                        break;
                    case 1:
                        this.plan_name = "Basic"
                        this.devices = "Phone + Tablet + Computer + TV"
                        this.price = rec == 1 ? "200/mo" : "2000/yr"
                        break;
                    case 2:
                        this.plan_name = "Standard"
                        this.devices = "Phone + Tablet + Computer + TV"
                        this.price = rec == 1 ? "500/mo" : "5000/yr"
                        break;
                    case 3:
                        this.plan_name = "Premium"
                        this.devices = "Phone + Tablet + Computer + TV"
                        this.price = rec == 1 ? "700/mo" : "7000/yr" 
                        break;  
                }

                this.activity_status = subscription.activity_status == 1 ? "active" : "canceled"
                var d = new Date(subscription.activated_on)
                var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
                var start_date = `${d.getDate()} ${months[d.getMonth()]}, ${d.getFullYear()}`
                d = new Date(subscription.reniews_on)
                var end_date = `${d.getDate()} ${months[d.getMonth()]}, ${d.getFullYear()}`

                this.start = start_date
                this.end = end_date

                this.subscription_id = subscription.subscription_id

            }
        },
        methods: {
            
            cancelsub : async function(){
                var self = this
                try{
                    const cancelsubs = await fetch(`${process.env.VUE_APP_BASE}/api/subscriptions/cancel_subscription`,{
                        method : 'post',
                        headers:{
                            "Access-Control-Allow-Origin": '*',
                            'Content-Type' : 'application/json'
                        },
                        body : JSON.stringify({
                            sub_id : this.subscription_id
                        })
                    })

                    var response = await cancelsubs.json()
                    this.activity_status = response.activity_status == 1 ? "active" : "canceled"
                }catch(err){
                    console.log(err);
                }
            },
            gotoaccount : function() {
                this.$router.push('/account')
            }
        },
        beforeCreate() {
            if(!localStorage.getItem("token")){
                this.$router.push('/')
            }
        },
    }

</script>

<style scoped>
    .wrapper-main{
        background-color: #1f4d91;
        display: flex;
        justify-content: center;
        align-content: center;
        height: 100vh;
    }

    .plan_details{
        display: flex;
        flex-direction: column;
        background-color: rgb(255, 255, 255);
        padding: 30px;
        height: fit-content;
        margin: auto;
        border-radius: 20px;
        width: 400px;
    }

    .plan_activity{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .plan_activity .active{
        display: flex;
        flex-direction: row;
    }

    .plan_activity h2 {
        margin-top: 0px;
        margin-right: 10px;
        font-size: 1.6em;
    }

    .plan_activity .active div.active{
        color: rgb(0, 51, 0);
        font-weight: bold;
        font-size: 0.7em;
        background-color: rgba(7, 204, 7, 0.534);
        height: fit-content;
        padding: 5px;
        border-radius: 5px;
    }

    .plan_activity .active div.canceled{
        color: rgb(61, 33, 1);
        font-weight: bold;
        font-size: 0.7em;
        background-color: rgba(214, 142, 7, 0.534);
        height: fit-content;
        padding: 5px;
        border-radius: 5px;
    }

    .plan-name-price{
        display: flex;
        flex-direction: column;
    }

    .plan-name-price .name {
        font-size: 1.2em;
        font-weight: bold;
        color: rgb(66, 66, 66);

    }

    .plan-name-price .devices{
        font-size: 0.8em;
        color: rgb(90, 90, 90);
    }

    .plan-name-price .price{
        font-size: 2em;
        font-weight: bolder;
        margin-top: 15px;
    }

    .note p{
        margin-top: 20px;
        padding: 8px;
        background-color: aliceblue;
        font-size: 0.9em;
        color: rgb(83, 83, 83);
    }

    .cancel{
        color: rgba(5, 96, 182, 0.815);
        font-weight: bold;
    }

    .cancel:hover{
        cursor: pointer;
    }

    button{
        margin-top: 20px;
        color: #1f4d91;
        border: #1f4d91 2px solid;
        width: fit-content;
        font-weight: bold;
        border-radius: 5px;
        padding: 10px 20px;
        background-color: transparent;
    }

    button:hover{
        cursor: pointer;
    }

    .nosubs{
        background-color: white;
        font-size: 1em;
        height: min-content;
        margin: auto;
        padding: 50px;
        border-radius: 10px;
    }

    .nosubs h1{
        margin-top: 0px;
    }

    .nosubs button{
        font-size: 1.2em;
        width: 100%;
    }

    @media (max-width: 800px) {
        .plan_details{
            width: 80vw;
        }
    }


</style>