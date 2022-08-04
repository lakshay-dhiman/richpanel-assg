<template>
    <div class="wrapper-main">
        <div class="register-wrapper">
            <h3 class="heading">
                Create Account
            </h3>
            <div class="errors" v-for="err in error" :key="err">
                {{err}}
            </div>
            <form @submit="validate_form">
                <label for="name">Name :</label>
                <input type="text" name="name" id="name" placeholder="Enter your name" v-model="name">

                <label for="email">Email :</label>
                <input type="text" id="email" name="email" placeholder="Enter your email address" v-model="email">

                <label for="password">Password : </label>
                <input type="text" id="password" name="password" placeholder="Enter a password" v-model="password">

                <input type="submit" id="submit" value="Sign Up">
            </form>
            <div class="tologin">Already Have an account ? <a @click="gotologin">Login</a></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RegisterPage",
        data(){
            return{
                email : null,
                password : null,
                name : null,
                error : []
            }
        },
        beforeCreate() {
            if(localStorage.getItem("token")){
                this.$router.push('/account')
            }
        },
        methods: {
            
            validateEmail : function(email){
                return String(email)
                    .toLowerCase()
                    .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    );
            },
            gotologin : function(){
                this.$router.push('/login')
            },
            validate_form : function (e){
                var self = this
                e.preventDefault();
                this.error = []
                var name = self.name, email = this.email, password = this.password

                var error = false
                if(name=="" || this.name == null){
                    self.error.push("Name cannot be empty")
                    error = true
                }
                else if(email==""||this.email == null){
                    self.error.push("Email cannot be empty")
                    error = true
                }
                else if(password==""||this.password == null){
                    self.error.push("Password cannot be empty")
                    error = true
                }
                else if(!this.validateEmail(email)){
                    self.error.push("Enter valid email")
                    error = true
                }
                else if(password.length < 6){
                    self.error.push("Password should be atleast 6 characters long")
                    error = true
                }

                if(!error){
                    this.register_user(name,email,password);
                }
            },
            register_user: async function(name,email,password){
                var data = {
                        "name" : name,
                        "email" : email,
                        "password" : password
                }
                try{
                    const res = await fetch(`${process.env.VUE_APP_BASE}/api/auth/register`,{
                        method : 'post',
                        headers:{
                            "Access-Control-Allow-Origin": '*',
                            'Content-Type' : 'application/json'
                        },
                        body : JSON.stringify(data)
                    })  
                    const status = await res.status
                    if(status == 200){
                        //registed now log in
                        this.login_user(data.email,data.password)
                    }else{
                        const response = await res.json() 
                        this.error.push(response.error) 
                    }              
                }catch(err){
                    console.log(err);
                }
            },
            login_user: async function(email,password){
                var data = {
                        "email" : email,
                        "password" : password
                } 
                try{
                    const res = await fetch(`${process.env.VUE_APP_BASE}/api/auth/login`,{
                        method : 'post',
                        headers:{
                            "Access-Control-Allow-Origin": '*',
                            'Content-Type' : 'application/json'
                        },
                        body : JSON.stringify(data)
                    })  
                    const status = await res.status
                    if(status == 200){
                        const response = await res.json() 
                        const token = response.token
                        const user_id = response._id
                        const name = response.name
                        this.$store.commit("setToken", token)
                        this.$store.commit("setUserId", user_id)
                        this.$store.commit("setUserName", name)
                        localStorage.setItem("token",response.token)
                        localStorage.setItem("user_id",response._id)
                        localStorage.setItem("name",response.name)
                        this.$router.push('/account')
                    }else{
                        const response = await res.json() 
                        this.error.push(response.error) 
                    }              
                }catch(err){
                    console.log(err);
                }
            }
        },
    }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

.wrapper-main{
    background-color: #1f4d91;
    display: flex;
    justify-content: center;
    align-content: center;
    height: 100vh;
}


.register-wrapper{
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 30px;
    height: fit-content;
    margin: auto;
    border-radius: 20px;
}

form{
    display: flex;
    flex-direction: column;
}

h3{
    text-align: center;
}

input{
    width: 300px;
    margin: 10px 0px;
    height: 30px;
    border: 1px rgb(185, 185, 185) solid;
    padding-left: 10px;
    border-radius: 5px;
}

label{
    font-size: 0.9em;
    font-weight: bold;
    margin-top: 15px;
}

#submit{
    background-color: #1f4d91;
    color: white;
    font-size: 1em;
    padding: 10px;
    height: auto;
    width: 100%;
}

#submit:hover{
    cursor: pointer;
}

.tologin{
    font-size: 0.9em;
    margin-top: 20px;
    text-align: center;
    width: 100%;
    color: rgb(99, 99, 99);
}

.tologin a{
    color: #1f4d91;
    text-decoration: none;
}

.tologin a:hover{
    cursor: pointer;
}
</style>
