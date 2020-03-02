const state = {
  db: null,
  name: 'vyca.db',
  location: 'default',
  version: 1
}

const getters = {
  getDb (state) {
    // console.log('getDb', state.database)
    return state.db
  }
}

const mutations = {
  setDb (state, value) {
    state.db = value
  }
}

const actions = {
  open () {
    return new Promise((resolve) => {
      resolve(state.db)
    })
  },
  start (context) {
    return new Promise((resolve) => {
      const db = window.sqlitePlugin.openDatabase({
        name: state.name,
        location: state.location
      })
      context.commit('setDb', db)
      resolve(db)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
