import request from "@/utils/request"

/**
 * 查询首页分类的电影的电影
 * @param {String | 'hot' |'tobe' | 'soon'} type
 * @param {Object} params
 * @return {Promise<{code,msg,data}>}
 */
export function indexTypeFilmReq(type, params) {
    let types = ['hot', 'tobe', 'soon']
    if (types.indexOf(type) === -1)
        type = types[0]
    let base = '/api/user/film/list/index/type'
    return request({
        url: base,
        method: 'get',
        params: {type: type, ...params}
    })
}

/**
 * 查询电影页分类的电影的电影
 * @param {String | 'hot' |'tobe' | 'soon'} type
 * @param {Object} params
 * @param {Paging} paging 分页
 * @return {Promise<{code,msg,data}>}
 */
export function filmPageTypeFilmReq(type, params, {pageNum, pageSize}) {
    let types = ['hot', 'tobe', 'soon']
    if (types.indexOf(type) === -1)
        type = types[0]
    let base = '/api/user/film/list/film/type'
    return request({
        url: base,
        method: 'get',
        params: {type: type, ...params, pageNum, pageSize}
    })
}

/**
 * 查询电影详情
 * @param {String} filmId 电影Id
 * @return {Promise<{code,msg,data}>}
 */
export function filmDetailReq(filmId) {
    let base = '/api/user/film/one/id'
    return request({
        url: base,
        method: 'get',
        params: {filmId: filmId}
    })
}


/**
 * 电影搜索页按名称查询
 * @param {String} name 查询名称
 * @param {String | '电影','歌剧'} type 影片类型
 * @param {Paging} paging 分页
 * @return {Promise<{code,msg,data}>}
 */
export function filmListByNameTypeReq(name, type, {pageNum, pageSize}) {
    let types = ['电影', '歌剧']
    type = (types.indexOf(type) === -1 ? types[0] : type)
    let base = '/api/user/film/list/search/name'
    return request({
        url: base,
        method: 'get',
        params: {name: name, pageNum, pageSize, filmType: type}
    })
}

/**
 * 电影搜索页按演员查询
 * @param {String} actor 查询名称
 * @param {Paging} paging 分页
 * @return {Promise<{code,msg,data}>}
 */
export function filmListByActorReq(actor, {pageNum, pageSize}) {
    let base = '/api/user/film/list/search/actor'
    return request({
        url: base,
        method: 'get',
        params: {name: actor, pageNum, pageSize}
    })
}

/**
 * 添加电影收藏
 * @param {Number,String} filmId
 * @param type 类型
 * @return {Promise<{code,msg,data}>}
 */
export function filmCollectAddReq(filmId, type) {
    let types = ['want', 'already']
    type = types.indexOf(type)
    type = type === -1 ? 0 : type;
    let base = '/api/user/film/insert/collect'
    return request({
        url: base,
        method: 'post',
        data: {
            filmId: filmId,
            type: type
        }
    })
}

/**
 * 查询收藏电影
 * @param type 类型
 * @param filmType 品类
 * @param paging 分页
 * @return {Promise<{code,msg,data}>}
 */
export function filmCollectListReq(type, filmType, {pageNum, pageSize}) {
    let types = ['want', 'already']
    type = types.indexOf(type)
    type = type === -1 ? 0 : type;
    let base = '/api/user/film/list/collect/user'
    return request({
        url: base,
        method: 'get',
        params: {
            type: type,
            filmType: filmType,
            ...{pageNum, pageSize}
        }
    })
}


/**
 * 查询收藏电影数量
 * @return {Promise<{code,msg,data}>}
 */
export function filmCollectCountReq() {
    let base = '/api/user/film/count/collect/user'
    return request({
        url: base,
        method: 'get',
    })
}

/**
 * 查询这部电影的收藏情况
 * @param filmId
 * @return {*}
 */
export function filmCollectDetailReq(filmId){
    let base = '/api/user/film/one/collect'
    return request({
        url: base,
        method: 'get',
        params: {
            filmId: filmId
        }
    })
}
