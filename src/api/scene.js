import request from "@/utils/request";
import '@/api/annotation'

/**
 * 通过电影id和日期查询场次
 * @param {String,Number} filmId 电影id
 * @param {DateOnly} day 日期字符串
 * @return {Promise<{code,msg,data}>}
 */
export function filmDaySceneReq(filmId, day) {
    let base = '/api/user/scene/list/film_day'
    return request({
        url: base,
        method: 'get',
        params: {filmId: filmId, day: day}
    })
}

/**
 * 根据场次编号查询场次详细信息
 * @param {String | Number} sceneId 场次编号
 * @return {Promise<{code,msg,data}>}
 */
export function sceneDetailReq(sceneId) {
    let base = '/api/user/scene/one/pk'
    return request({
        url: base,
        method: 'get',
        params: {
            sceneId: sceneId
        }
    })
}
