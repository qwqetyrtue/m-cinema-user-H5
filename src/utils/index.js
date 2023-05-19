/**
 * 获取今天到后7天的日期数组
 * @return [{day: '4月30日', week: '星期日'}]
 */
export function getDaysArray(num = 7) {
    let days = [];
    let today = new Date();
    let dayOfWeek = ['日', '一', '二', '三', '四', '五', '六'];

    for (let i = 0; i < num; i++) {
        let date = new Date(today);
        date.setDate(today.getDate() + i);

        let year = date.getFullYear()
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let week = dayOfWeek[date.getDay()];

        let dayStr = `${month}月${day}日`;
        let weekStr = (i === 0) ? '今天' : `星期${week}`;

        days.push({
            year: year + '',
            day: dayStr,
            week: weekStr,
            value: `${year}-${(month < 10) ? `0${month}` : month}-${(day < 10) ? `0${day}` : day}`
        });
    }
    return days;
}

/**
 * 获取日期的月日部分
 * @return {string} 'MM-dd'
 */
export function getMonthDayPart(time) {
    let date;
    if (time instanceof Date)
        date = time
    else
        date = new Date(time);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let monthStr = (month < 10) ? `0${month}` : month;
    let dayStr = (day < 10) ? `0${day}` : day;

    return `${monthStr}-${dayStr}`;
}

export function getDatePart(time) {
    let date;
    if (time instanceof Date)
        date = time
    else
        date = new Date(time);
    let year = date.getFullYear()
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let monthStr = (month < 10) ? `0${month}` : month;
    let dayStr = (day < 10) ? `0${day}` : day;

    return `${year}-${monthStr}-${dayStr}`;
}

/**
 * 获取日期 小时和分部分
 * @param time
 * @return {string} 'hh-mm'
 */
export function getTimePart(time) {
    let date;
    if (time instanceof Date)
        date = time
    else
        date = new Date(time);
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

export function strToArray(str, split) {
    if (str == null) return null
    let sp = split || ';'
    return str.split(sp)
}

export function arrayToString(arr, split) {
    if (arr == null) return null;
    let sp = split || ';'
    let res = ''
    for (let i = 0; i < arr.length; i++) {
        res += arr[i]
        if (i + 1 !== arr.length) {
            res += sp
        }
    }
    return res
}

const colors = [
    '#cd84f1', '#ffcccc', '#ff4d4d', '#ffaf40',
    '#fffa65', '#32ff7e', '#18dcff', '#7d5fff',
    '#7efff5', '#FEA47F', '#B33771', '#3B3B98',
    '#FD7272', '#9AECDB', '#D6A2E8', '#BDC581']

export function randomColor(id) {
    if (id) {
        return colors[id % colors.length]
    }
    return colors[Math.floor(Math.random() * colors.length)]
}

/**
 * 解析base64字符串
 * @param dataUrl
 * @return {{data: *, type: *, suffix: *}}
 */
export function parseBase64Str(dataUrl) {
    let arr = dataUrl.split(',')
    // ex: data:image/png;base64,
    let type = arr[0].match(/:(.*?);/)[1]
    // suffix是该文件的后缀
    let suffix = type.split('/')[1]
    let data = arr[1]
    return {
        type,
        suffix,
        data
    }
}

/**
 * 完整base64字符串 转 文件
 * @param dataUrl base64字符串
 * @param filename 文件名
 * @return {File}
 */
export function base64toFile(dataUrl, filename = 'file') {
    let params = parseBase64Str(dataUrl)
    let blob = dataURL2Blob(params.data, params.type)
    return blob2File(blob, filename, params.suffix, params.type)
}

/**
 * 保存文件
 * @param file FIle
 */
export function saveFile(file) {
    let downLink = document.createElement('a') // 创建元素
    downLink.download = file.name ? file.name : 'download.png' // 设置要保存的文件名
    let blobs = new Blob([file]) // 将文件数据转为Blob对象
    downLink.href = URL.createObjectURL(blobs) // 通过Blob对象生成下载连接
    downLink.style.display = 'none' // 隐藏此元素ui
    document.body.appendChild(downLink) // 将元素插入到页面中
    downLink.click() // 代码执行点击动作
    document.body.removeChild(downLink) // 移除该元素
}

/**
 * base64数据字符串部分 转 blob
 * @param dataUrl
 * @param type
 * @return {module:buffer.Blob}
 */
export function dataURL2Blob(dataUrl, type) {
    let bStr = new Buffer(dataUrl, 'base64').toString('latin1')
    // n 是解码后的长度
    let n = bStr.length
    // Uint8Array 数组类型表示一个 8 位无符号整型数组 初始值都是 数子0
    let u8arr = new Uint8Array(n)
    // charCodeAt() 方法可返回指定位置的字符的 Unicode 编码。这个返回值是 0 - 65535 之间的整数
    while (n--) {
        u8arr[n] = bStr.charCodeAt(n)
    }
    return new Blob([u8arr], {type: type})
}

/**
 * blob转file
 * @param blob
 * @param fileName
 * @param suffix
 * @param type
 * @return {File}
 */
export function blob2File(blob, fileName, suffix, type) {
    return new File([blob], `${fileName}.${suffix}`, {type: type, lastModified: Date.now()})
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
    if (arguments.length === 0 || !time) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string')) {
            if ((/^[0-9]+$/.test(time))) {
                // support "1548221490638"
                time = parseInt(time)
            } else {
                // support safari
                // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
                time = time.replace(new RegExp(/-/gm), '/')
            }
        }

        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        return value.toString().padStart(2, '0')
    })
    return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
    if (('' + time).length === 10) {
        time = parseInt(time) * 1000
    } else {
        time = +time
    }
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) {
        // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return (
            d.getMonth() +
            1 +
            '月' +
            d.getDate() +
            '日' +
            d.getHours() +
            '时' +
            d.getMinutes() +
            '分'
        )
    }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
    url = url == null ? window.location.href : url
    const search = url.substring(url.lastIndexOf('?') + 1)
    const obj = {}
    const reg = /([^?&=]+)=([^?&=]*)/g
    search.replace(reg, (rs, $1, $2) => {
        const name = decodeURIComponent($1)
        let val = decodeURIComponent($2)
        val = String(val)
        obj[name] = val
        return rs
    })
    return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
    // returns the byte length of an utf8 string
    let s = str.length
    for (var i = str.length - 1; i >= 0; i--) {
        const code = str.charCodeAt(i)
        if (code > 0x7f && code <= 0x7ff) {
            s++
        } else if (code > 0x7ff && code <= 0xffff) s += 2
        if (code >= 0xDC00 && code <= 0xDFFF) i--
    }
    return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
    const newArray = []
    for (let i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i])
        }
    }
    return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
    if (!json) return ''
    return cleanArray(
        Object.keys(json).map(key => {
            if (json[key] === undefined) return ''
            return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
        })
    ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
    const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
    if (!search) {
        return {}
    }
    const obj = {}
    const searchArr = search.split('&')
    searchArr.forEach(v => {
        const index = v.indexOf('=')
        if (index !== -1) {
            const name = v.substring(0, index)
            const val = v.substring(index + 1, v.length)
            obj[name] = val
        }
    })
    return obj
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
    const div = document.createElement('div')
    div.innerHTML = val
    return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
    if (typeof target !== 'object') {
        target = {}
    }
    if (Array.isArray(source)) {
        return source.slice()
    }
    Object.keys(source).forEach(property => {
        const sourceProperty = source[property]
        if (typeof sourceProperty === 'object') {
            target[property] = objectMerge(target[property], sourceProperty)
        } else {
            target[property] = sourceProperty
        }
    })
    return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
    if (!element || !className) {
        return
    }
    let classString = element.className
    const nameIndex = classString.indexOf(className)
    if (nameIndex === -1) {
        classString += '' + className
    } else {
        classString =
            classString.substr(0, nameIndex) +
            classString.substr(nameIndex + className.length)
    }
    element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTimeNum(type) {
    if (type === 'start') {
        return new Date().getTime() - 3600 * 1000 * 24 * 90
    } else {
        return new Date(new Date().toDateString())
    }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result

    const later = function () {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp

        // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = null
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args)
                if (!timeout) context = args = null
            }
        }
    }

    return function (...args) {
        context = this
        timestamp = +new Date()
        const callNow = immediate && !timeout
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait)
        if (callNow) {
            result = func.apply(context, args)
            context = args = null
        }

        return result
    }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'deepClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach(keys => {
        if (source[keys] && typeof source[keys] === 'object') {
            targetObj[keys] = deepClone(source[keys])
        } else {
            targetObj[keys] = source[keys]
        }
    })
    return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
    return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
    const timestamp = +new Date() + ''
    const randomNum = parseInt((1 + Math.random()) * 65536) + ''
    return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
        ele.className = ele.className.replace(reg, ' ')
    }
}
