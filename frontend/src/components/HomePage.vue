<template>
<div class="wrapper-main">
    <div class="home-wrapper">
        <h1>WELCOME TO #APP</h1>  
        <div class="buttons">
            <button @click="gotologin">LOGIN</button>  
            <button @click="gotoregister">REGISTER</button>
        </div>
</div>
</div>

</template>

<script>
export default {
    name: 'HomePage',
    methods: {
        gotologin: function(){
            this.$router.push('/login')
        },
        gotoregister: function(){
            this.$router.push('/register')
        },

    },
    beforeCreate(){
        if(localStorage.getItem('token')){
            this.$router.push('/account')
        }
    }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Goldman&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

.wrapper-main{
    background-color: white;
    display: flex;
    justify-content: center;
    align-content: center;
    height: 100vh;
    flex-direction: column;
}

.home-wrapper{
    width: fit-content;
    margin: auto;
}

h1{
    height: fit-content;
    margin: auto;
    color: #1f4d91;
    font-size: 3em;
    font-weight: bolder;
    text-align: center;
}

.buttons{
    height: fit-content;
    margin: auto;
    width: fit-content;
    margin-top: 50px;
}

button{
    margin: 10px;
    background-color: transparent;
    padding: 10px;
    border: #1f4d91 solid 2px;
    color: #1f4d91;
    font-weight: bold;
    font-size: 1.1em;
}
button:hover{
    cursor: pointer;
}




</style>
