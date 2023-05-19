/**
 * @typedef {Object} Paging 分页
 * @property {number} pageSize 分页数
 * @property {number} pageNum 当前页码
 */

/**
 * @typedef {Object} Res 返回结果
 * @property {number} code 返回码
 * @property {String} msg 返回的消息
 * @property {Object} data 返回的数据
 */

/**
 * @typedef {String} DateOnly 格式为:'yyyy-MM-dd'的时间字符串
 */

/**
 * @typedef {String} TimeOnly 格式为:'HH:mm:ss'的时间字符串
 */

/**
 * @typedef {String} DateTime 格式为:'yyyy-MM-dd HH:mm:ss'的时间字符串
 */


/**
 * @typedef {Object} CommentRoot
 * @property {String} content 评论内容
 * @property {Number | String} conditionId 评论对象id
 * @property {Number} star 评论分
 */

/**
 * @typedef {Object} CommentBranch
 * @property {String} content 评论内容
 * @property {Number | String} conditionId 评论对象id
 * @property {Number | String} parentId 父评论Id
 */

