// 动态引入api文件夹中的js文件，命名必须以.api.js结尾，否则无法引入

const api = Object.create(null)

const modules = require.context('./api', true, /\.api.js$/)
modules.keys().forEach(function(key) {
  Object.assign(api, modules(key))
})

export default api
