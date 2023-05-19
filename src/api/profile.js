import request from "@/utils/request"
import '@/api/annotation'
import {base64toFile} from "@/utils";

/**
 * 修改用户信息
 * @param data 修改信息
 * @return {Promise<{code,msg,data}>}
 */
export function userUpdateReq(data) {
    let base = '/api/user/profile/update/profile'
    return request({
        url: base,
        method: 'post',
        data: data
    })
}

/**
 * 修改用户图像
 * @param {File} avatar 头像
 * @return {Promise<{code,msg,data}>}
 */
export function userAvatarUpdate(avatar){
    let base = '/api/user/profile/update/avatar'
    let formData = new window.FormData()

    formData.append('avatar', avatar)

    return request({
        url: base,
        method: 'post',
        data: formData
    })
}
