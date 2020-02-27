import ala from '@/service/ala.js'

/*
 * 签到
 */
export async function signin() {
  var result = await ala.httpPost('Api/SignIn/SignIn')
  return result
}
