import ala from '@/service/ala'
// 获取枚举中的文字

export function enumText(enumType, value) {
  if (!enumType) {
    return value
  }
  var enumFind = this.getEnum(enumType)
  var itemValue = enumFind.keyValue.find(item => item.key === value)
  if (itemValue) {
    return itemValue.value
  }
  return value
}

export function enumGet(enumType) {
  if (!enumType) {
    return
  }
  var allEnums = this.getAllEnums()
  if (!allEnums) {
    return
  }
  var find = allEnums.find(item => item.name.toLowerCase() === enumType.toLowerCase())
  if (find) {
    return find
  }
}

// 获取枚举中的文字
export function enumValue(enumType, value) {
  if (!enumType) {
    return value
  }
  var enumFind = this.getEnum(enumType)
  if (enumFind && enumFind.keyValue) {
    var itemValue = enumFind.keyValue.find(item => item.key === value)
    return itemValue
  }
}

// 系统所有的枚举
export function enumAll() {
  ala.localHttp('init_all_enums_keyvalues', 'api/type/AllEnums').then(result => {
    return result
  })
}
