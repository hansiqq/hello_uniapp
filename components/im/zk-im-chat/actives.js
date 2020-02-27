import ala from '@/service/ala'
export default {
  toolClick(jsThis, data) {
    const { type } = data
    switch (type) {
      case 'album':
        this.albumClick(jsThis, data.type)
        break
      case 'camera':
        this.albumClick(jsThis, data.type)
        break
      case 'video':
        this.musicVideo(jsThis)
        break
      case 'map':
        this.chosenPosition(jsThis)
        break
    }
  },
  // 选择本地图片
  albumClick(jsThis, typeData) {
    return uni.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: [typeData],
      success: res => {
        uni.uploadFile({
          url: ala.host + 'api/StorageFile/upload',
          filePath: res.tempFilePaths[0],
          fileType: 'image',
          name: 'data',
          success: resImage => {
            var response = JSON.parse(resImage.data)
            var imageUrl = ''
            if (response.path.indexOf('http') === -1) {
              var repString = response.path.replace('/wwwroot', 'wwwroot')
              imageUrl = ala.host + repString
            }
            jsThis.change(imageUrl, 4)
          }
        })
      }
    })
  },
  // 短视频
  musicVideo(jsThis) {
    uni.chooseVideo({
      count: 1,
      sourceType: ['camera', 'album'],
      success: function(res) {
        uni.uploadFile({
          url: ala.host + 'api/StorageFile/upload',
          filePath: res.tempFilePath,
          fileType: 'video',
          name: 'data',
          success: resImage => {
            var videoRespont = JSON.parse(resImage.data)
            var videoUrl = ''
            if (videoRespont.path.indexOf('http') === -1) {
              var repString = videoRespont.path.replace('/wwwroot', 'wwwroot')
              videoUrl = ala.host + repString
            }
            jsThis.change(videoUrl, 9)
          }
        })
      }
    })
  },
  // 位置
  chosenPosition(jsThis) {
    uni.chooseLocation({
      success: function(res) {
        var para = {
          content: '',
          latitude: res.latitude,
          longitude: res.longitude,
          poi: res.address,
          locationName: res.name
        }
        jsThis.change(para, 7)
      }
    })
  }
}
