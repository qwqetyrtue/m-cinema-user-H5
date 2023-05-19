import {getToken, removeToken, setToken} from "@/utils/auth";
import {getUserInfoReq, loginReq} from "@/api/auth";

const state = {
    token: getToken(),
    user: {},
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    RESET_TOKEN: (state) => {
        state.token = null
    },
    SET_USER: (state, user) => {
        state.user = user
    },
    RESET_USER: (state) => {
        state.user = {}
    },
}

const actions = {
    login: ({commit, state}, {type, userInfo}) => {
        return new Promise((resolve, reject) => {
            loginReq(type, userInfo)
                .then(({msg, code, data}) => {
                    commit('SET_TOKEN', data.token)
                    setToken(data.token)
                    resolve()
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    logout: ({commit, state}) => {
        commit('RESET_TOKEN')
        removeToken()
    },
    getUserInfo: ({commit, state}) => {
        return new Promise((resolve, reject) => {
            getUserInfoReq()
                .then(({data, msg, code}) => {
                    commit('SET_USER', data)
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
