import axios from 'axios'
import {Toast} from "vant";
import store from '@/store'
import {getToken} from '@/utils/auth'

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent

        if (store.getters.token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['m-cinema-user'] = getToken()
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data
        // 返回0为成功,反之则操作失败
        if (res.code !== 0) {
            // 处理登陆超时或者未登录
            if (res.code === 503 || res.code === 504) {
                store.dispatch('auth/logout')
                    .then(() => {
                        Toast({
                            overlay: true,
                            message: res.msg,
                            type: 'fail',
                            duration: 2 * 1000,
                        })
                    })
            } else {
                Toast(res.msg || 'Error', {
                    overlay: true,
                    type: 'fail',
                    duration: 2 * 1000
                })
            }
            return Promise.reject(new Error(res.msg || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        Toast({
            message: error.message || 'Error',
            type: 'fail',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
