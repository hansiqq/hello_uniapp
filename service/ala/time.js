/*
 * 时间为刚刚、几分钟前、几小时前、几天前
 */
export function timeAgo(timeDate) {
  var dateTimeStamp = toTimeSpan(timeDate)
  var minute = 1000 * 60
  var hour = minute * 60
  var day = hour * 24
  var now = new Date().getTime()
  var diffValue = now - dateTimeStamp
  if (diffValue < 0) {
    return timeDate
  }
  var minC = diffValue / minute
  var hourC = diffValue / hour
  var dayC = diffValue / day
  if (dayC >= 1 && dayC <= 6) {
    return ' ' + parseInt(dayC) + '天前'
  } else if (hourC >= 1 && hourC <= 23) {
    return ' ' + parseInt(hourC) + '小时前'
  } else if (minC >= 1 && minC <= 59) {
    return ' ' + parseInt(minC) + '分钟前'
  } else if (diffValue >= 0 && diffValue <= minute) {
    return '刚刚'
  } else {
    return timeDate
  }
}

// 将时间转为时间戳
function toTimeSpan(timeDate) {
  var time = new Date(timeDate).getTime()
  return time
}