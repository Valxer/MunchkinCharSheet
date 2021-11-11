import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import chars from './chars'
import monsters from './monsters'

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      chars,
      monsters
    },
    plugins:[createPersistedState()]
  })
  return Store
})