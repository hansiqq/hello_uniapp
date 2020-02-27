import ala from '@/service/ala.js'

/// 加载所有的地址保存到缓存中去
export async function addressAll() {
  var address = ala.localGet('init_region_address_list')
  if (address) {
    if (address.province && address.city && address.area) {
      return address
    } else {
      ala.localRemove('init_region_address_list')
    }
  }
  address = {
    province: '',
    city: '',
    area: ''
  }
  var province = await ala.httpGet('api/Region/GetRegionData?level=2')
  address.province = JSON.parse(province)
  var city = await ala.httpGet('api/Region/GetRegionData?level=3')
  address.city = JSON.parse(city)
  var area = await ala.httpGet('api/Region/GetRegionData?level=4')
  address.area = JSON.parse(area)
  ala.localSet('init_region_address_list', address)
  return address
}

// 城市索引

export async function addressCityIndex() {
  var result = await ala.localHttp('init_region_address_city_index', 'api/Region/CityIndex')
  return result
}

/**
 * 根据城市名称获取 区县列表
 * @param  cityName  城市名称
 */
export async function addressGetCounty(cityName) {
  var para = {
    cityName: cityName
  }
  var result = await ala.httpGet('api/Region/GetCountyByCity', para)
  return result
}

/*
 * 用户自己的地址
 */
export async function addressUser() {
  var result = await ala.httpGet('api/useraddress/get')
  if (result.length > 0) {
    var dataIndex = result.findIndex(r => r.isDefault === true)
    result.splice(0, 0, result.splice(dataIndex, 1)[0])
  }
  return result
}

/*
 * 编辑地址
 */
export async function addressEdit(data) {
  var result = await ala.httpPost('api/useraddress/SaveOrderAddress', data)
  return result
}

/*
 * 删除地址
 */
export async function addressDelete(id) {
  var result = await ala.httpDelete('api/useraddress/delete?id=' + id)
  return result
}

// 获取用户定位
export function addressLocation() {
  var location = ala.localGet('user_recent_city')
  return new Promise((resolve, reject) => {
    uni.addressLocation({
      geocode: true,
      success: async res => {
        if (location) {
          if (location === res.address.city || location === res.address.district) {
            resolve(location)
          } else {
            var show = await ala.showModal(`定位到您在: ${res.address.city}`, `是否切换到该城市探索`)
            if (show) {
              ala.localSet('user_recent_city', res.address.city)
              resolve(res.address.city)
            } else {
              resolve(location)
            }
          }
        } else {
          var isAddress = await ala.showModal('定位', '系统请求获取您所在的城市')
          if (isAddress) {
            ala.localSet('user_recent_city', res.address.city)
            resolve(res.address.city)
          } else {
            resolve('获取位置失败')
          }
        }
      }
    })
  })
}
