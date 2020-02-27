import store from '@/service/store'
import ala from '@/service/ala'

export function vuexSet(name, value) {
  store.state[name] = value
}
export function vuexGet(name) {
  return store.state[name]
}
export function vuexLocalGet(name) {
  var data = vuexGet(name)
  if (data) {
    return data
  } else {
    data = ala.localGet(name)
    vuexSet(name, data)
    return data
  }
}
export function vuexLocalSet(name, value) {
  vuexSet(name, value)
  ala.localSet(name, value)
}
