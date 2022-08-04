<template>
    <div class="wrapper-main">
        <div class="wrapper-payment">
            <div class="payment">
                <h2>Complete Payment</h2>
                <p>Enter your credit or debit card details below</p>                    

                <form id="payment-form" @submit="stripeSubmit">
                    <div id="card-element"></div>

                    <button id="submit">Confirm Payment</button>
                    <img src="../assets/loader.svg" alt="loading" v-if="status == 1">
                    <img src="../assets/check.svg" alt="success" v-if="status == 0">
                    <img src="../assets/error.svg" alt="error" v-if="status == 2">


                </form>
                <div class="errors" v-for="err in error" :key="err">
                    {{err}}
                </div>
            </div>
            <div class="information">
                <h2>Order Summary</h2>
                <div class="details">
                    <div class="info">
                        <div>Plan Name :</div>
                        <div>{{plan_name}}</div>
                    </div>
                    <div class="info">
                        <div>Billing Cycle :</div>
                        <div>{{billing_cycle}}</div>
                    </div>
                    <div class="info">
                        <div>Plan Price :</div>
                        <div>&#8377; {{price}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {loadStripe} from '@stripe/stripe-js';
    export default {
        data() {
            return {
                error : [],
                plan_name : null,
                billing_cycle : null,
                price : null,
                token : null,
                price_num : null,
                plan_value : null,
                rec_value : null,
                status : null
            }
        },
        async mounted() {
            var self = this
            var plan = this.$route.params.plan
            var rec = this.$route.params.rec
            plan = parseInt(plan)
            this.plan_value = parseInt(plan)
            this.rec_value = parseInt(rec)
            switch (plan) {
                case 0:
                    this.plan_name = "Mobile"
                    this.price = rec == 1 ? "100/mo" : "1000/yr"
                    this.price_num = rec == 1 ? 100 : 1000

                    break;
                case 1:
                    this.plan_name = "Basic"
                    this.price = rec == 1 ? "200/mo" : "2000/yr"
                    this.price_num = rec == 1 ? 200 : 2000
                    break;
                case 2:
                    this.plan_name = "Standard"
                    this.price = rec == 1 ? "500/mo" : "5000/yr"
                    this.price_num = rec == 1 ? 500 : 5000
                    break;
                case 3:
                    this.plan_name = "Premium"
                    this.price = rec == 1 ? "700/mo" : "7000/yr" 
                    this.price_num = rec == 1 ? 700 : 7000
                    break;  
            }

            this.billing_cycle = (rec == 1) ? "Monthly" : "Yearly"

            const stripe = await loadStripe(process.env.VUE_APP_PUBLIC_KEY);
            var elements = stripe.elements();
            var style = {
            base: {
                color: "#32325d",
            }
            };

            var card_element = elements.create("card", { style: style });
            card_element.mount("#card-element");
            var form = document.getElementById('payment-form');

            form.addEventListener('submit', async function(event) {
                event.preventDefault();
                self.error = []
                
                try{
                    var card = await stripe.createSource(card_element) 
                    self.status = 1
                    if(card.source) {
                        const three_ds_source = await stripe.createSource({
                            type: 'three_d_secure',
                            currency: "inr",
                            amount : self.price_num*100,
                            three_d_secure: {
                                card: card.source.id
                            },
                            redirect: {
                                return_url: `${process.env.VUE_APP_CLIENT_BASE}/redirect`
                            }
                        })  
         
                        var redirect = three_ds_source.source.redirect.url
                        var redirect_window = window.open(redirect,"redirect","width=500px,height=500px,left=100,top=100")

                        var winClosed = setInterval( async function () {
                            if (redirect_window.closed) {
                                clearInterval(winClosed);
                                var data_payload = {
                                    plan : {
                                        type : self.plan_value,
                                        rec : self.rec_value, 
                                    },
                                    user : {
                                        user_id : localStorage.getItem("user_id"),
                                        user_name : localStorage.getItem("name")
                                    },
                                    source : three_ds_source.source.id
                                }

                                var response = await fetch(`${process.env.VUE_APP_BASE}/api/payments/subscribe`,{
                                    method : 'post',
                                    headers:{
                                        "Access-Control-Allow-Origin": '*',
                                        'Content-Type' : 'application/json'
                                    },
                                    body : JSON.stringify(data_payload)
                                })

                                if(response.status == 200){
                                    self.status = 0
                                    window.setTimeout(()=>{
                                        self.$router.push('/subscription')    
                                    },1000)
                                    
                                }else{
                                    var err = await response.json()
                                    console.log(err.error);
                                    self.status = 2
                                    self.error.push(err.error)
                                }
                            }
                        }, 250); 

                    }else if(card.error){
                        self.status = 3
                        self.error.push(card.error.message)
                    }

                }catch(err){
                    console.log(err);
                }
                
            })
        },
        async beforeCreate() {
            if(!localStorage.getItem("token")){
                this.$router.push('/')
            }
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
            if(subscription.activity_status == 1) {
                this.$router.push('/')
            }

            var plan = this.$route.params.plan
            var rec = this.$route.params.rec
            if(!((plan == 0 ||plan == 1 || plan == 2 || plan == 3 )&&(rec == 0 || rec == 1))){
                this.$router.push('/')
            }
        },


    }
</script>

<style scoped>

    .wrapper-main{
        background-color: #1f4d91;
        height: 100vh;
        display: flex;
        margin: auto;
        justify-content: center;
        align-content: center;
    }

    .wrapper-payment{
        width: 50vw;
        background-color: white;
        margin: auto;
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 30px;
        border-radius: 10px;
    }

    .payment{
        display: flex;
        flex-direction: column;

    }

    .payment h2{
        margin: 10px;
        margin-left: 0px;
        margin-bottom: 0px;
    }
    .payment p{
        margin-top: 5px;
        font-size: 0.9em;
        color: rgb(138, 138, 138);
    }

    #card-element{
        border: rgb(133, 133, 133) 1px solid;
        margin-top: 10px;
        padding: 10px ;
        border-radius: 5px ;
        width: 90%;
    }

    .payment button{
        margin-top: 20px;
        border: none;
        background-color: #1f4d91;
        padding: 10px;
        color: white;
        border-radius: 5px;
    }

    .information{
        padding-left: 50px;
        margin-left: 20px;
        border-left: 1px rgb(168, 168, 168) solid;
    }

    .information h2{
        font-size: 1.2em;
        margin-left: 10px;
    }


    .information .details{
        display: flex;
        flex-direction: column;
        width: 80%;
    }

    .information .details .info{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        border-top: 1px rgb(214, 214, 214) solid;
        padding: 15px;
        color: rgb(0, 0, 0);
    }

    .information .details .info div:first-child{
        font-weight: bold;
    }

    .information .details .info:first-child{
        border: none;
    }

    #token_reciever{
        display: hidden;
    }
    
    img{
        width: 30px;
        height: auto;
        transform: translate(20px,10px);
    }

    .errors{
        color: red;
        margin-top: 20px;
        font-size: 0.9em;
    }

    button:hover{
        cursor: pointer;
    }

    @media (max-width: 1400px) {
        .wrapper-payment{
            width: 80vw;
        }
    }
</style>