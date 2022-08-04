<template>
  <div id="page">
    <LogoutButton :key="componentKey" />
    <router-view/>
  </div>
</template>

<script>
import LogoutButton from './components/LogoutButton.vue'
export default {
  name: 'App',
  data() {
    return {
      componentKey : 0,
    }
  },
  components: {
    LogoutButton
  },
  watch: {
    '$route': function(to, from) {
      this.componentKey += 1;
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

  body{
    margin: 0px;
    font-family: 'Roboto', sans-serif;
  }

    .errors{
        color: red;
        margin-top: 20px;
        font-size: 0.9em;
    }


</style>