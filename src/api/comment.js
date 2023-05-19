import request from "@/utils/request"
import '@/api/annotation'

const conditionMap = {
    film: 1,
    post: 2
}

/**
 * 添加评论
 * @param {String | 'film' | 'post' } condition 评论情景
 * @param {CommentRoot} params 评论参数
 * @return {Promise<{code,msg,data}>}
 */
export function addRootCommentReq(condition, {content, conditionId, star}) {
    let base = '/api/user/comment/insert/root'
    condition = conditionMap[condition]
    if (condition == null) throw new Error('无此评论情景')
    return request({
        url: base,
        method: 'post',
        data: {content, conditionId, condition, star}
    })
}


/**
 * 添加子评论
 * @param {String | 'film' | 'post' } condition 评论情景
 * @param {CommentBranch} params 评论参数
 * @return {Promise<{code,msg,data}>}
 */
export function addBranchCommentReq(condition, {content, conditionId, parentId}) {
    let base = '/api/user/comment/insert/branch'
    condition = conditionMap[condition]
    if (condition == null) throw new Error('无此评论情景')
    return request({
        url: base,
        method: 'post',
        data: {content, conditionId, condition, parentId}
    })
}

/**
 * 查询某个电影文章等的全部评论
 * @param {String | 'film' | 'post' } condition 评论情景
 * @param {Number | String} conditionId 评论主体id
 */
export function listRootCommentReq(condition, conditionId) {
    let base = '/api/user/comment/list/layer'
    condition = conditionMap[condition]
    if (condition == null) throw new Error('无此评论情景')
    return request({
        url: base,
        method: 'get',
        params: {
            condition, conditionId
        }
    })
}

/**
 * 查询某个电影文章等的全部评论
 * @param {String | 'film' | 'post' } condition 评论情景
 * @param {Number | String} conditionId 评论主体id
 * @param {Number | String} parentId 父评论id
 */
export function listBranchCommentReq(condition, conditionId,parentId) {
    let base = '/api/user/comment/list/child'
    condition = conditionMap[condition]
    if (condition == null) throw new Error('无此评论情景')
    return request({
        url: base,
        method: 'get',
        params: {
            condition, conditionId,parentId
        }
    })
}
