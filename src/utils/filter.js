export { roleMap, genderMap ,collectMap}

const roleMap = ['超级管理员', '用户管理员', '电影管理员', '文章管理员', '档期管理员', '影厅管理员']

const genderMap = ['', '女', '男', '隐藏']

const collectMap = ['want','already']

function isNull(v) {
  return v == null
}

export function numUnitFilter(num, unit) {
  if (isNull(num)) return ''
  if (isNaN(Number.parseInt(num))) return 'NaN'
  return num + ' ' + unit
}

export function ageFilter(age) {
  return numUnitFilter(age, '岁')
}

export function roleFilter(role) {
  let i = Number.parseInt(role)
  if (isNaN(i)) return 'error'
  if (i > roleMap.length) {
    return '错误'
  }
  return roleMap[i - 1]
}

export function genderFilter(gender) {
  if (isNull(gender)) return ''
  let i = Number.parseInt(gender)
  if (isNaN(i)) {
    return 'NaN'
  }
  if (i > genderMap.length || i < 1) {
    return '错误'
  }
  return genderMap[i]
}

export function quotesNameFilter(name) {
  if (isNull(name)) return ''
  return '《' + name + '》'
}

export function yearFilter(year) {
  return numUnitFilter(year, '年')
}

export function minuteFilter(minute) {
  return numUnitFilter(minute, '分钟')
}

export function imageUrlFilter(url) {
  if (isNull(url)) return ''
  let i = url.indexOf('http')
  if (i === 0) {
    return url
  }
  if (i === -1) {
    return '/api/resource/s/image/' + url
  }
  return 'error'
}

export function hallTypeFilter(type) {
  if (isNull(type)) return ''
  return type
}

export function seatLevelFilter(level) {
  if (isNull(level)) return ''
  return level
}

export function seatNumFilter(num) {
  return numUnitFilter(num, '个')
}

export function seatRowFilter(row) {
  return numUnitFilter(row, '行')
}

export function seatColFilter(row) {
  return numUnitFilter(row, '列')
}
