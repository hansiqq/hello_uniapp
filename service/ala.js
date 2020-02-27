const ala = Object.create(null)

const modules = require.context('./ala', true, /\.js$/)
modules.keys().forEach(function (key) {
  Object.assign(ala, modules(key))
})

const modulesApi = require.context('./api/tool', true, /\.api.js$/)
modulesApi.keys().forEach(function (key) {
  Object.assign(ala, modulesApi(key))
})

export default ala

