import ala from '@/service/ala'
import crypto from '@/service/utils/crypto'

// 登陆用户
export function user () {
  return userInfo()
}

// 登录
export async function userLogin (model) {
  if (model.username === '' || model.username === undefined) {
    uni.showToast({
      icon: 'none',
      title: '账号不能为空'
    })
    return
  }
  if (model.password === '' || model.password === undefined) {
    uni.showToast({
      icon: 'none',
      title: '密码不能为空'
    })
    return
  }
  if (model.username.length < 3) {
    uni.showToast({
      icon: 'none',
      title: '账号最短为 3 个字符'
    })
    return
  }
  if (model.password.length < 6) {
    uni.showToast({
      icon: 'none',
      title: '密码最短为六位数'
    })
    return
  }
  ala.localRemove(userKey())
  if (ala.localGet('wechat_openId') !== undefined) {
    model.openId = ala.localGet('wechat_openId')
  }
  var response = await ala.httpPost('Api/Member/Login', model)
  if (response) {
    var userInfo = crypto.encrypt(
      JSON.stringify({
        userName: model.username,
        password: model.password
      })
    )
    ala.localSet('user_info', userInfo)
    if (response) {
      setUser(response)
      ala.toastSuccess('登录成功')
      var openId = response.openId
      if (ala.strLength(openId) >= 12) {
        ala.localSet('wechat_openId', openId)
      }
      userLoginAfterTo()
    }
  } else {
    ala.toastWarn(response.message)
  }
  ala.localRemove('wechat_logincount')
}
// 注册

export async function userReg (model) {
  if (!ala.strIsEmpty(model.password) && model.password.length < 6) {
    uni.showToast({
      icon: 'none',
      title: '密码最短为六位数'
    })
  }
  if (ala.localGet('wechat_openId') !== undefined) {
    model.openId = ala.localGet('wechat_openId')
  }
  uni.showLoading({
    title: '加载中..'
  })
  var response = await ala.httpPost('api/Member/Reg', model)
  if (response) {
    ala.toastSuccess('注册成功')
    setUser(response)
    uni.hideLoading()
    ala.to('/')
  } else {
    ala.toastWarn(response.message)
  }
}

// 退出登录
export async function userLogout () {
  uni.showModal({
    title: '退出登录',
    showCancel: true,
    content: '您确定要确认退出登录?',
    success: function (res) {
      if (res.confirm) {
        ala.localRemove(userKey())
        ala.localRemove('user_info')
        ala.localRemove('user_token')
        ala.localRemove('shop_order_select_address')
        ala.vuexSet('loginUser', null)
        ala.to('/pages/tabbar/index')
      }
    }
  })
}

// 是否登录
export function userIsLogin () {
  var user = userInfo()
  if (!user) {
    return false
  } else {
    return true
  }
}
// 用户Id
export function userId () {
  var loginUser = user()
  if (loginUser === undefined || loginUser === null) {
    return 0
  }
  return loginUser.id
}
// 用户名
export function userName () {
  if (userInfo() === null) {
    return ''
  }
  return userInfo().userName
}
// 当前登录用户

// 将用户信息写入缓存
function setUser (user) {
  if (ala.strIsEmpty(user)) {
    ala.toastWarn('用户登录失败')
    return null
  }
  if (ala.strIsEmpty(user.token)) {
    ala.toastWarn('用户登录失败')
    return null
  }
  if (user.token < 12) {
    ala.toastWarn('用户登录失败')
    return null
  }
  var userToken
  userToken = user.token
  uni.setStorageSync('user_token', user.token)
  ala.vuexSet('loginUser', user)
  var userText = crypto.encrypt(JSON.stringify(user), userToken)
  uni.setStorageSync(userKey(), userText)
}

function userKey () {
  return crypto.userKey()
}

// 跳转到登录页面
export function userToLoginPage () {
  ala.toastWarn('请先登录')
  ala.to('/user/login')
}

// 登录成功后跳转
export function userLoginAfterTo () {
  var userIndex = '/pages/tabbar/user'
  if (userIsLogin()) {
    ala.to(userIndex)
    // // 跳转到上一级页面
    // if (getCurrentPages().length === 1) {
    // 	// 如果直接进入登录页面，跳转到会员中心
    // 	ala.to(userIndex)
    // } else {
    // 	ala.back()
    // }
  }
}
// 检查是否需要登录，如果需要登录则跳转到登录页面，登录成功以后，返回到上一级页面
export function userCheckLogin (option) {
  if (!userIsLogin()) {
    if (option) {
      var usercode = option.usercode
      if (!ala.strIsEmpty(usercode)) {
        // url 包含推荐码时跳转
        ala.to('/user/reg')
      }
    }
    uni.showModal({
      title: '未登录',
      content: '请先登录',
      success: function (res) {
        if (res.confirm) {
          ala.to('/user/login')
        } else if (res.cancel) {
          uni.reLaunch({
            url: '/pages/tabbar/index'
          })
        }
      }
    })
  }
  return true
}

function userInfo () {
  var user = ala.vuexLocalGet('loginUser')
  if (user) {
    return user
  } else {
    var user = ala.localGet(userKey())
    if (user) {
      var loginUser = JSON.parse(crypto.decrypt(user, ala.localGet('user_token')))
      ala.vuexSet('loginUser', loginUser)
    } else {
      return
    }
  }
  if (user) {
    // 对加密数据进行base64处理,
    // 将数据先base64还原，再转为utf8数据,再解密数据
    return JSON.parse(crypto.decrypt(crypto.utf8(crypto.base64(user)), ala.localGet('user_token')))
  }
  if (!user) {
    return null
  }
  return user
}
// 微信公众号登录
function weixinPublogin (data) {
  if (data !== undefined) {
    var session = data.session
    if (session !== undefined) {
      var openId = data.session.openid
      if (openId !== undefined) {
        ala.localSet('wechat_openId', openId)
        // 登录
        if (data.user !== undefined) {
          // setUser(data.user)
          //  ala.toastSuccess('登录成功')
          // ala.log(data.user.username + '通过微信公众号号登录成功,openId' + openId)
        }
      }
    }
  }
}
