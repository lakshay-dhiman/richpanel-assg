<template>
    <div class="plans-wrapper">
        <h1>
            Choose the right plan for you
        </h1>
        <div class="plan-picker">
            <div class="head">
                <!-- <div class="row-one  row"> -->
                    <div class="rec">
                        <div class="reccurence" @click="switchrecurrence">
                            <div class="left" :class="{active : (rec == 1)}">Monthly</div>
                            <div class="right" :class="{active : (rec == 0)}">Yearly</div>
                        </div>
                    </div>
                    <div :class="{active : (plan == 0)}" @click="changePlan(0)" class="heading">
                        <span>Mobile</span>
                    </div>
                    <div :class="{active : (plan == 1)}" @click="changePlan(1)" class="heading">
                        <span>Basic</span>
                    </div>
                    <div :class="{active : (plan == 2)}" @click="changePlan(2)" class="heading">
                        <span>Standard</span>
                    </div>
                    <div :class="{active : (plan == 3)}" @click="changePlan(3)" class="heading">
                        <span>Premium</span>
                    </div>
                <!-- </div> -->
                <!-- <div class="row-three  row"> -->
                    <div class="property first">Monthly price</div>
                    <div class="attribute first" :class="{active : (plan == 0)}" @click="changePlan(0)">&#8377; {{price1}}</div>
                    <div class="attribute first" :class="{active : (plan == 1)}" @click="changePlan(1)">&#8377; {{price2}}</div>
                    <div class="attribute first" :class="{active : (plan == 2)}" @click="changePlan(2)">&#8377; {{price3}}</div>
                    <div class="attribute first" :class="{active : (plan == 3)}" @click="changePlan(2)">&#8377; {{price4}}</div>
                <!-- </div> -->

                <!-- <div class="row-three row"> -->
                    <div class="property">Video Quality</div>
                    <div class="attribute" :class="{active : (plan == 0)}" @click="changePlan(0)">Good</div>
                    <div class="attribute" :class="{active : (plan == 1)}" @click="changePlan(1)">Good</div>
                    <div class="attribute" :class="{active : (plan == 2)}" @click="changePlan(2)">Better</div>
                    <div class="attribute" :class="{active : (plan == 3)}" @click="changePlan(3)">Best</div>
                <!-- </div> -->

                <!-- <div class="row-three row"> -->
                    <div class="property">Resolution</div>
                    <div class="attribute" :class="{active : (plan == 0)}" @click="changePlan(0)">480p</div>
                    <div class="attribute" :class="{active : (plan == 1)}" @click="changePlan(1)">480p</div>
                    <div class="attribute" :class="{active : (plan == 2)}" @click="changePlan(2)">1080p</div>
                    <div class="attribute" :class="{active : (plan == 3)}" @click="changePlan(3)">4K+HDR</div>
                <!-- </div> -->

                <!-- <div class="row-three row"> -->
                    <div class="property last">Devices you can use to watch</div>
                    <div class="attribute last" :class="{active : (plan == 0)}" @click="changePlan(0)" >
                        <ul>
                            <li>Phone</li>
                            <li>Tablet</li>
                        </ul>
                    </div>
                    <div class="attribute last" :class="{active : (plan == 1)}" @click="changePlan(1)">
                        <ul>
                            <li>Phone</li>
                            <li>Tablet</li>
                            <li>Computer</li>
                            <li>TV</li>
                        </ul>
                    </div>
                    <div class="attribute last" :class="{active : (plan == 2)}" @click="changePlan(2)">
                        <ul>
                            <li>Phone</li>
                            <li>Tablet</li>
                            <li>Computer</li>
                            <li>TV</li>
                        </ul>
                    </div>
                    <div class="attribute last" :class="{active : (plan == 3)}" @click="changePlan(3)"> 
                        <ul>
                            <li>Phone</li>
                            <li>Tablet</li>
                            <li>Computer</li>
                            <li>TV</li>
                        </ul>
                    </div>
                <!-- </div> -->
                
            </div>
        </div>
        <button @click = "gotocheckout">Next</button>
    </div>
</template>

<script>
    export default {
        name : "PlansDisplay",
        data() {
            return {
                rec : 1,
                plan : 0,
            }
        },
        computed: {
            price1: function() {
                return this.rec == 1 ?  '100' : '1000'
            },
            price2: function() {
                return this.rec == 1 ?  '200' : '2000'
            },
            price3: function() {
                return this.rec == 1 ?  '500' : '5000'
            },
            price4: function() {
                return this.rec == 1 ?  '700' : '7000'
            }
        },
        methods: {
            switchrecurrence : function(){
                if(this.rec == 1){
                    this.rec = 0
                }else{
                    this.rec = 1
                }

            },
            changePlan : function(plan){
                this.plan = plan
            },
            gotocheckout : function(){
                const url = `/checkout/${this.plan}/${this.rec}`
                this.$router.push(url)
            }
        },
        async beforeCreate() {
            if(!localStorage.getItem('token')){
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
                this.$router.push('/subscription')
            }
        },
    }
</script>

<style scoped>
    #app{
        background-color: white;
    }

    .plans-wrapper{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-content: center;
    }

    .plan-picker{
        margin-top: 50px !important;
    }

    .reccurence{
        display: flex;
        flex-direction: row;
        width: 150px;
        background-color: #1f4d91;
        padding: 15px 10px;
        border-radius: 60px;
        color: white;
        font-size: 0.9em;
        font-weight: bold;
        margin: 0px;
        justify-content: center;
        align-content: center;
    }

    h1{
        text-align: center;
    }

    .head{
        display: grid;
        grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr;
    }

    .row{
        display: flex;
        flex-direction: row;
    }

    .reccurence div{
        padding: 10px;
    }

    .reccurence .active{
        background-color: white;
        padding: 10px;
        border-radius: 50px;
        color: #1f4d91;
        transition: 0.2s;
        
    }
    
    .plan-picker{
        margin: auto;
    }
    .plan-picker table{
        margin: auto;
        border-spacing: 20px;
        
    }

    .heading{
        background-color: #7894bd;
        width: 100px;
        height: 100px;
        position: relative;
        color: white;
        font-weight: normal !important;
        font-size: 1.2em;
        font-weight: bold;
        vertical-align: middle;
        display: flex;
        margin: auto;
    }

    .heading span{
        height: fit-content;
        margin: auto;
    }

    .heading:hover{
        cursor: pointer;
    }

    .heading.active::after{
        content: "";
        width: 0px;
        height: 0px;
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;
        border-top: 20px solid #1f4d91;
        position: absolute;
        bottom: -20px;
        right: 50%;
        transform: translateX(50%);
        font-size: 0.8em;

    }

    .heading.active{
        background-color: #1f4d91;
        transition: 0.2s;
    }


    .heading:hover{
        cursor: pointer;
    }

    .property{
        font-size: 1em;
    }

    .property, .attribute{
        margin-top: 20px;
        border-bottom: 1px rgb(185, 185, 185) solid;
        padding-bottom: 20px;
    }

    .first{
        margin-top: 50px;
    }

    .attribute{
        text-align: center;
    }

    .last{
        border: none !important;
    }


    .attribute ul{
        list-style: none;
        margin: 0px;
        padding-left: 0px;
    }
    .attribute ul li{
       padding: 5px;
       font-size: 0.9em;
       text-align: center;
       padding-left: 0px;
    }

    .attribute.active{
        color: #1f4d91;
        font-weight: bold;
        transition: 0.2s ;
    }

    button{
        width: 400px;
        background-color: #1f4d91;
        color: white;
        font-size: 1.2em;
        border: none;
        margin: auto;
        margin-top: 50px;
        height: 50px;
    }

    button:hover{
        cursor: pointer;
    }


    @media (max-width: 800px) {
        .heading{
            display: none;
        }
        .rec{
            grid-column: 1/ span 5 ;
        }
        .reccurence{
            margin: auto;
        }
        button{
            margin: 50px auto;
        }
    }
    

</style>