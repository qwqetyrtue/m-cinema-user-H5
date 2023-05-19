import request from "@/utils/request";
import '@/api/annotation'

/**
 * 定票
 * @param {Number,String} sceneId 场次Id
 * @param {Array} inHallIndexList 选定座位的场内编号
 * @return {Promise<{msg,code,data}>}
 */
export function orderTicketReq(sceneId, inHallIndexList) {
    let base = '/api/user/ticket/order'
    return request({
        url: base,
        method: 'post',
        data: {
            sceneId: sceneId,
            inHallIndexList: inHallIndexList
        }
    })
}

/**
 * 根据状态查询我的电影票
 * @param {String} type 票务类型
 * @param {Paging} paging 分页
 * @return {Promise<{msg,data,code}>}
 */
export function listTicketByStatusReq(type, {pageNum, pageSize}) {
    let typeMap =
        {
            reserve: 0,
            paid: 1,
            used: 2,
            refund: 3,
            accident: -1
        }
    type = typeMap[type] == null ? 0 : typeMap[type];
    let base = '/api/user/ticket/list/status'
    return request({
        url: base,
        method: "get",
        params: {
            ticketStatus: type,
            ...{pageNum, pageSize}
        }
    })
}


/**
 * 模拟支付功能
 * @param {String} orderId 订单编号
 * @return {Promise<{msg,data,code}>}
 */
export function payTicketMockReq(orderId) {
    let base = '/api/user/ticket/pay/mock'
    return request({
        url: base,
        method: 'post',
        data: {
            orderId: orderId
        }
    })
}
