import request from "@/utils/request"
import '@/api/annotation'

/**
 * 登陆请求
 * @return {Promise<{code,msg,data}>}
 */
export function loginReq(type, data) {
    let types = ['account', 'sms']
    if (types.indexOf(type) === -1)
        type = types[0]
    let base = '/api/user/auth/login/'
    return request({
        url: base + type,
        method: 'post',
        data: data
    })
}

/**
 * 获取用户信息
 * @return {Promise<{code,msg,data}>}
 */
export function getUserInfoReq() {
    return request({
        url: '/api/user/auth/info',
        method: 'get',
    })
}

/**
 * 创建账户
 * @param {String} phone
 * @param {String} password
 * @return {Promise<{code,msg,data}>}
 */
export function createAccountReq({phone, password}) {
    return request({
        url: '',
        method: 'post',
        data: {
            phone,
            password
        }
    })
}


