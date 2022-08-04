<template>
        <button @click="logout" v-if="logged_in == true">LOGOUT</button>
</template>

<script>
export default{
    data() {
        return {
            logged_in : false
        }
    },
    name : 'LogoutButton',
    methods: {
        logout : function(){
            localStorage.clear()
            window.location.reload()
        }
    },
    mounted() {
        if(localStorage.getItem('token')){
            this.logged_in = true
        }
    },
}
</script>


<style scoped>
    button{
        position: absolute;
        background-color: white;
        color: #1f4d91;
        font-size: 1em;
        padding: 10px;
        border-radius: 5px;
        right: 20px;
        top: 20px;
        font-weight: bolder;
    }

    button:hover{
        cursor: pointer;
    }
</style>