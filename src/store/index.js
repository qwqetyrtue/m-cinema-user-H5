import Vue from 'vue'
import Vuex from 'vuex'
import getters from "@/store/getters";
import app from "@/App.vue";
import auth from "@/store/modules/auth";

Vue.use(Vuex)

const store = new Vuex.Store({
    getters,
    modules: {
        app,
        auth,
    },
})

export default store
