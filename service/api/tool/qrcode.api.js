import ala from '@/service/ala'
import poster from './qrcode/QS-SharePoster.js'
/*
 * 根据二维码设置Id和实体对象id生成会员专属二维码
 * id: 二维码设置Id
 * entityId: 实体对象id,比如商品Id，会员Id，视频Id，教程ID，文章ID
 */
export async function qrcode (id, entityId) {
  var para = {
    id: id,
    entityId: entityId
  }
  var result = await ala.httpPost('Api/QrCode/Get', para)
  return result
  // 开始生成二维码
  // return createQrCode(jsThis, JSON.parse(result.setting))
}

/*
 * 根据服务设置信息生成二维码
 */
export async function createQrCode (jsThis, data) {
  var list = []
  data.qrcodeList.forEach(element => {
    if (element.Type === 1) {
      list.push(drawQrCode(element))
    }
    if (element.Type === 2) {
      list.push(drawQrText(element))
    }
    if (element.Type === 3) {
      drawQrImage(element)
    }
  })

  var para = getCanvas(jsThis, list, data)
  var response = await poster.getSharePoster(para)
  return response
}
/*
 * 根据设置画二维码
 */
function drawQrCode (setting) {
  return {
    type: 'qrcode',
    text: setting.Text,
    alpha: 1,
    dx: setting.X,
    dy: setting.Y,
    size: setting.Size
  }
}

/*
 * 根据设置画图片
 */
function drawQrImage (setting) {
  return {
    type: 'image',
    url: setting.Path, // 图片位置
    alpha: 1,
    dx: setting.X,
    dy: setting.Y,
    infoCallBack (imageInfo) {
      return {
        dWidth: setting.Width,
        dHeight: setting.Height
      }
    }
  }
}

/*
 * 根据设置画文字
 */
function drawQrText (setting) {
  return {
    type: 'text', // 文本类型
    text: setting.Text, // 文本内容
    alpha: 1, // 设置透明度
    fontStyle: 'italic', // 字体类型
    size: setting.Size, // 字体大小
    color: setting.Color, // 字体颜色
    textAlign: 'left', // 文字显示位置
    textBaseline: 'middle', // 大小设置
    dx: setting.X, // 位置信息
    dy: setting.Y // 位置信息
  }
}

/*
 * 创建画布实例
 */
// eslint-disable-next-line
/* eslint-disable */
export function getCanvas (jsThis, list, data) {
  return {
    _this: jsThis,
    type: 'testShareType',
    posterCanvasId: 'default_PosterCanvasId',
    delayTimeScale: 20,
    backgroundImage: data.backgroundUrl,
    drawArray: async ({ bgObj, type, bgScale }) => {
      return new Promise((rs, rj) => {
        rs([...list])
      })
    },
    setCanvasWH: ({ bgObj, type, bgScale }) => {
      jsThis.poster = bgObj
    }
  }
}

// {
//          	type: 'qrcode',
//          	text: '您好，我是取舍',
//          	size: bgObj.width * 0.3,
//          	dx: 10,
//          	dy: 10
//          }