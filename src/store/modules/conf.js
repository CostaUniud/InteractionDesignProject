import { LocalStorage } from 'quasar'

const state = {
  tab: 'home',
  watchID: '',
  foto: null,
  dialog: {},
  scan: false
}

const getters = {
  getTab (state) {
    // console.log('getTab', state.tab)
    return state.tab
  },
  getWatchID (state) {
    // console.log('getWatchID', state.watchID)
    return state.watchID
  },
  getFotoProfilo (state) {
    // console.log('getFotoProfilo')
    return state.foto
  },
  dialog (state) {
    // console.log('getDialog', state.dialog)
    return state.dialog
  },
  getScan (state) {
    // console.log('getScan', state.scan)
    return state.scan
  }
}

const mutations = {
  setTab (state, value) {
    // console.log('setTab', value)
    state.tab = value
  },
  setWatchID (state, value) {
    // console.log('setWatchID', value)
    state.watchID = value
  },
  setFotoProfilo (state, value) {
    // console.log('setFoto')
    state.foto = value
    LocalStorage.set('_foto', value)
  },
  dialog (state, value) {
    // console.log('setDialog', value)
    state.dialog = value
  },
  setScan (state, value) {
    // console.log('setScan', value)
    state.scan = value
  }
}

const actions = {
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
