/*
 * 转换为小写
 *  @param str 字符串
 */

export function strToLower(str) {
  if (str) {
    return str.toLowerCase()
  }
  return str
}

/*
 * 转换为大写
 *  @param str 字符串
 */

export function strToUpper(str) {
  if (str) {
    return str.toUpperCase()
  }
  return str
}

/*
 * 根据开始字符串截取子字符串
 *  @param str 字符串
 * @param startStr 开始字符串，必须唯一
 */

export function strSubStart(str, stratStr) {
  if (str && stratStr) {
    var start = str.indexOf(stratStr)
    if (start > -1) {
      var result = str.substring(0, start)
      return result
    }
  }
  return str
}

/*
 * 判断字符串是否为空或null,undefined
 */
export function strIsEmpty(str) {
  if (!str) {
    return true
  }
  if (str === 'null' || str === 'undefined' || str === '') {
    return true
  }
  return false
}

/*
 * 首字母小写
 */
export function strFirstLower(str) {
  var strTemp = '' // 新字符串
  for (var i = 0; i < str.length; i++) {
    if (i === 0) {
      strTemp += str[i].toLowerCase() // 第一个
      continue
    }
    if (str[i] === ' ' && i < str.length - 1) {
      // 空格后
      strTemp += ' '
      strTemp += str[i + 1].toLowerCase()
      i++
      continue
    }
    strTemp += str[i]
  }
  return strTemp
}

// 判断字符串长度
export function strLength(str) {
  if (this.strIsEmpty(str)) {
    return 0
  }
  var len = str.length
  return len
}
