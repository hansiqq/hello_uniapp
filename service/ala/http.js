import token from '@/service/utils/token'
import ala from '@/service/ala'
import globalConfig from '@/service/config'

async function request(apiUrl, method, data) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: globalConfig.host + apiUrl,
      method: method,
      data: {
        ...data
      },
      header: {
        ...getHead(apiUrl)
      },
      complete(res) {
        if (res.statusCode === 200) {
          if (res.data.status === 1) {
            if (res.data.result !== null && res.data.result !== undefined) {
              resolve(res.data.result)
            } else {
              resolve(res.data)
            }
          } else if (res.data) {
            resolve(null)
            ala.toastWarn(res.data.message)
          }
        } else {
          reject(res)
        }
      }
    })
  })
}

export async function httpGet(apiUrl, data) {
  var response = await request(apiUrl, 'GET', data)
  return response
}

export async function httpPost(apiUrl, data) {
  var response = await request(apiUrl, 'POST', data)
  return response
}

//  Put方法：改
export async function httpPut(apiUrl, data) {
  var response = await request(apiUrl, 'PUT', data)
  return response
}

export async function httpDelete(apiUrl, data) {
  var response = await request(apiUrl, 'DELETE', data)
  return response
}

function getHead(apiUrl) {
  var headObj = {
    'zk-token': token.getToken(apiUrl),
    'zk-user-id': ala.userId(),
    'zk-user-token': token.getUserToken(apiUrl),
    'zk-tenant': ala.tenant(),
    'zk-timestamp': token.timestamp()
  }
  return headObj
}