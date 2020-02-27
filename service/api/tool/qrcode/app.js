// eslint-disable-next-line
/* eslint-disable */
let log = console.log

let _app = {
	log(t) {
		log(t)
	}, 
  showLoading(msg, ifmask) {
    uni.showLoading({
      title: msg,
      mask: ifmask || false
    })
  },
  hideLoading() {
    uni.hideLoading()
  },
  showToast(msg, icon) {
    uni.showToast({
      title: msg,
      icon: icon || 'none'
    })
  },
  // 重点保护对下那个
  getPosterUrl(objs) {
    // 后端获取背景图的url路径方法
    let { backgroundImage, type, formData } = objs
    return new Promise((rs, rj) => {
      let image
      if (backgroundImage) {
        image = backgroundImage
      } else {
        switch (
          type // 根据type获取背景图, 一般要改成request获取
        ) {
          case 1:
            image = ''
            break
          default:
            image = 'http://b-api.baoduoduo.club/wwwroot/uploads/api/242-873-583/2020-02-18/5e4ba878ae57ae1358e0e3dd.jpg'
            break
        }
      }
      if (image) {
        rs(image) // resolve图片的路径
      } else {
        rj('背景图片路径不存在')
      }
    })
  },

  isArray(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]'
  },
  isObject(arg) {
    return Object.prototype.toString.call(arg) === '[object Object]'
  },
  isPromise(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
  },
  isNull(arg) {
    return arg === null
  },
  isUndefined(arg) {
    return arg === undefined
  },
  isUndef(arg) {
    return arg === undefined
  },
  isNotNull_string(arg) {
    return arg !== null && arg !== undefined && arg !== ''
  },
  isFn(fn) {
    return fn && typeof fn === 'function'
  },
  getStorage(key, scb, fcb) {
    uni.getStorage({
      key,
      success: function(res) {
        if (res.data && res.data != '') {
          if (scb) scb(res.data)
        } else {
          if (fcb) fcb()
        }
      },
      fail: function() {
        if (fcb) fcb()
      }
    })
  },
  setStorage(key, data) {
    uni.setStorage({
      key,
      data
    })
  },
  setStorageSync(key, data) {
    uni.setStorageSync(key, data)
  },
  getStorageSync(key) {
    return uni.getStorageSync(key)
  },
  clearStorageSync() {
    uni.clearStorageSync()
  },
  removeStorageSync(key) {
    uni.removeStorageSync(key)
  },
  getImageInfo(url, cb, fcb) {
    url = checkMPUrl(url)
    uni.getImageInfo({
      src: url,
      success(res) {
        if (cb && typeof cb === 'function') cb(res)
      },
      fail(err) {
        if (fcb && typeof fcb === 'function') fcb(err)
      }
    })
  },
  // 下载文件
  downloadFile(url, cb) {
    url = checkMPUrl(url)
    uni.downloadFile({
      url,
      success(res) {
        if (cb && typeof cb === 'function') cb(res)
      }
    })
  },
  downloadFile_PromiseFc(url) {
    return new Promise((rs, rj) => {
      if (url.substring(0, 4) !== 'http') {
        rs(url)
      } else {
        url = checkMPUrl(url)
        uni.downloadFile({
          url,
          success(res) {
            if (res && res.tempFilePath) {
              rs(res.tempFilePath)
            } else {
              rj('not find tempFilePath')
            }
          },
          fail(err) {
            rj(err)
          }
        })
      }
    })
  },
  
  // 保存
  saveFile(url) {
    uni.saveFile({
      tempFilePath: url,
      success(res) {
      }
    })
  },
  downLoadAndSaveFile_PromiseFc(url) {
    return new Promise((rs, rj) => {
      if (url.substring(0, 4) === 'http') {
        url = checkMPUrl(url)
        uni.downloadFile({
          url,
          success(d_res) {
            if (d_res && d_res.tempFilePath) {
              // #ifdef H5
              rs(d_res.tempFilePath)
              // #endif

              // #ifndef H5
              uni.saveFile({
                tempFilePath: d_res.tempFilePath,
                success(s_res) {
                  if (s_res && s_res.savedFilePath) {
                    rs(s_res.savedFilePath)
                  } else {
                    rs(d_res.tempFilePath)
                  }
                },
                fail(err) {
                  rs(d_res.tempFilePath)
                }
              })
              // #endif
            } else {
              rj('not find tempFilePath')
            }
          },
          fail(err) {
            rj(err)
          }
        })
      } else {
        rs(url)
      }
    })
  },
  checkFile_PromiseFc(url) {
    return new Promise((rs, rj) => {
      uni.getSavedFileList({
        success(res) {
          let d = res.fileList
          let index = d.findIndex(item => {
            return item.filePath === url
          })
          rs(index)
        },
        fail(err) {
          rj(err)
        }
      })
    })
  },
  removeSavedFile(path) {
    uni.getSavedFileList({
      success(res) {
        let d = res.fileList
        let index = d.findIndex(item => {
          return item.filePath === path
        })
        if (index >= 0) {
          uni.removeSavedFile({
            filePath: path
          })
        }
      }
    })
  },
  fileNameInPath(path) {
    let s = path.split('/')
    return s[s.length - 1]
  },
  
  getImageInfo_PromiseFc(imgPath) {
    return new Promise((rs, rj) => {
      imgPath = checkMPUrl(imgPath)
      uni.getImageInfo({
        src: imgPath,
        success: res => {
          rs(res)
        },
        fail: err => {
          rj(err)
        }
      })
    })
  },
  previewImage(urls) {
    if (typeof urls === 'string') {
      urls = [urls]
    }
    uni.previewImage({
      urls
    })
  }
}

function checkMPUrl(url) {
  // #ifdef MP
  if (url.substring(0, 4) === 'http' && url.substring(0, 12) !== 'http://store' && url.substring(0, 10) !== 'http://tmp' && url.substring(0, 5) !== 'https') {
    url = 'https' + url.substring(4, url.length)
  }
  // #endif
  return url
}

module.exports = _app
