<template>
    processing payment
</template>

<script>
    // import {loadStripe} from '@stripe/stripe-js';
    export default{
        async mounted(){
            window.onunload = function () {
                opener.closedWindow(); 
            }; 
            window.close()    
        }
    }
</script>