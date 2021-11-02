import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import chars from './chars'

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      chars
    },
    plugins:[createPersistedState()]
  })
  return Store
})