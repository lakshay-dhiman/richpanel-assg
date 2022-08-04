import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'




export default new Vuex.Store({
    state () {
      return {
        user_id : null,
        user_name : null,
        token : null
      }
    },
    mutations: {
        setUserId(state,user_id){
            state.user_id = user_id
        },
        setUserName(state,user_name){
            state.user_name = user_name
        },
        setToken(state,token){
            state.token = token
        }
    },
    getters: {
        isLoggedIn(state) {
            return !!state.token;
        },
    },
    // plugins: [createPersistedState()],
})

// export default store