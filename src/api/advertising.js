import request from "@/utils/request"
import '@/api/annotation'

/**
 * 首页查询广告
 * @param {Number | String | null} num 条数
 * @return {Promise<{code,msg,data}>}
 */
export function advertisingIndexReq(num) {
    let base = '/api/user/advertising/list/num'
    return request({
        url: base,
        method: 'get',
        params: {
            num: num
        }
    })
}
