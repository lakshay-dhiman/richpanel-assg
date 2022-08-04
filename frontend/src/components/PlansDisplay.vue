<template>
    <div class="plans-wrapper">
        <h1>
            Choose the right plan for you
        </h1>
        <div class="plan-picker">
            <table class="head">
                <tr class="row-one">
                    <td>
                        <div class="reccurence" @click="switchrecurrence">
                            <div class="left" :class="{active : (rec == 1)}">Monthly</div>
                            <div class="right" :class="{active : (rec == 0)}">Yearly</div>
                        </div>
                    </td>
                    <th :class="{active : (plan == 0)}" @click="changePlan(0)">
                        Mobile
                    </th>
                    <th :class="{active : (plan == 1)}" @click="changePlan(1)">
                        Basic
                    </th>
                    <th :class="{active : (plan == 2)}" @click="changePlan(2)">
                        Standard
                    </th>
                    <th :class="{active : (plan == 3)}" @click="changePlan(3)">
                        Premium
                    </th>
                </tr>
            </table>
            <table class="data">
                <tr class="row-two">
                    <td class="property">Monthly price</td>
                    <td class="attribute" :class="{active : (plan == 0)}" @click="changePlan(0)">&#8377; {{price1}}</td>
                    <td class="attribute" :class="{active : (plan == 1)}" @click="changePlan(1)">&#8377; {{price2}}</td>
                    <td class="attribute" :class="{active : (plan == 2)}" @click="changePlan(2)">&#8377; {{price3}}</td>
                    <td class="attribute" :class="{active : (plan == 3)}" @click="changePlan(2)">&#8377; {{price4}}</td>
                </tr>

                <tr class="row-three">
                    <td class="property">Video Quality</td>
                    <td class="attribute" :class="{active : (plan == 0)}" @click="changePlan(0)">Good</td>
                    <td class="attribute" :class="{active : (plan == 1)}" @click="changePlan(1)">Good</td>
                    <td class="attribute" :class="{active : (plan == 2)}" @click="changePlan(2)">Better</td>
                    <td class="attribute" :class="{active : (plan == 3)}" @click="changePlan(3)">Best</td>
                </tr>

                <tr class="row-three">
                    <td class="property">Resolution</td>
                    <td class="attribute" :class="{active : (plan == 0)}" @click="changePlan(0)">480p</td>
                    <td class="attribute" :class="{active : (plan == 1)}" @click="changePlan(1)">480p</td>
                    <td class="attribute" :class="{active : (plan == 2)}" @click="changePlan(2)">1080p</td>
                    <td class="attribute" :class="{active : (plan == 3)}" @click="changePlan(3)">4K+HDR</td>
                </tr>

                <tr class="row-three">
                    <td class="property">Devices you can use to watch</td>
                    <td class="attribute" :class="{active : (plan == 0)}" @click="changePlan(0)" >
                        <ul>
                            <li>Phone</li>
                            <li>Tablet</li>
                        </ul>
                    </td>
                    <td class="attribute" :class="{active : (plan == 1)}" @click="changePlan(1)">
                        <ul>
                            <li>Phone</li>
                            <li>Tablet</li>
                            <li>Computer</li>
                            <li>TV</li>
                        </ul>
                    </td>
                    <td class="attribute" :class="{active : (plan == 2)}" @click="changePlan(2)">
                        <ul>
                            <li>Phone</li>
                            <li>Tablet</li>
                            <li>Computer</li>
                            <li>TV</li>
                        </ul>
                    </td>
                    <td class="attribute" :class="{active : (plan == 3)}" @click="changePlan(3)"> 
                        <ul>
                            <li>Phone</li>
                            <li>Tablet</li>
                            <li>Computer</li>
                            <li>TV</li>
                        </ul>
                    </td>
                </tr>
                
            </table>
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
        margin: auto;
        justify-content: center;
        align-content: center;
    }

    h1{
        text-align: center;
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
        width: 100vw;
        margin: 20px auto;
    }
    .plan-picker table{
        margin: auto;
        border-spacing: 20px;
        
    }

    table {
        width: 50vw;
    }

    table th{
        background-color: #7894bd;
        width: 100px;
        height: 100px;
        position: relative;
        color: white;
        font-weight: normal !important;
    }

    table.head th:hover{
        cursor: pointer;
    }

    table th.active::after{
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

    table th.active{
        background-color: #1f4d91;
        transition: 0.2s;
    }

    table.data{
        margin-top: 10px;
        border-collapse: collapse;
    }

    table.data:hover{
        cursor: pointer;
    }

    table.data td{
        text-align: center;
        border-top: 1px rgb(141, 141, 141) solid;
        padding: 20px 0px;
        vertical-align: top;
    }

    table.data td.property{
        text-align: left;
        vertical-align: top;
    }

    table.data tr:nth-child(1) td{
        border-top: none !important;
    }

    table.data ul{
        list-style: none;
        margin: 0px;
    }
    table.data ul li{
       padding: 5px;
       font-size: 0.9em;
       text-align: left;
       padding-left: 0px;
    }

    td.active{
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
        height: 50px;
    }

    button:hover{
        cursor: pointer;
    }

    @media (max-width: 1200px) {
         table th{
            display: none;
        }
    }
    @media (max-width: 500px) {
    table {
        margin: 10px 30px;
    }
    }

</style>