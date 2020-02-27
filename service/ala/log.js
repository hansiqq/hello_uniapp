import ala from '@/service/ala'
// 添加日志
export async function log() {
  var para = {
    message: JSON.stringify(arguments)
  }
  await ala.httpPost('api/logs/add', para)
}

export function info() {
  if (process.env.NODE_ENV === 'development') {
    /* eslint-disable */
    console.info(arguments)
  }
}
