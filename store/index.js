/**
 * Created by Akhtar on  25/04/2019.
 */

import Vuex from 'vuex'
import modules from './modules'

// let _store = null

const createStore = () => {
  return new Vuex.Store({
    strict: true,
    modules
  })
}

// for (const moduleName of Object.keys(modules)) {
//   if (modules[moduleName].actions && modules[moduleName].actions.nuxtServerInit) {
//     createStore().dispatch(`${moduleName}/nuxtServerInit`)
//   }
// }

export default createStore
