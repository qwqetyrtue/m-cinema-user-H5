import request from "@/utils/request";
import '@/api/annotation'

/**
 * 查询场次内被占用的座位
 * @param {String,Number} sceneId 场次Id
 * @return {Promise<{code,msg,data}>}
 */
export function listReservedSeatReq(sceneId) {
    let base = '/api/user/seat/list/reserved'
    return request({
        url: base,
        method: "get",
        params: {
            sceneId: sceneId
        }
    })
}
