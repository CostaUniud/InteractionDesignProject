import { LocalStorage } from 'quasar'

const state = {
  tab: 'home',
  watchID: '',
  startPosition: null,
  endPosition: null,
  distanzaPercorsa: null,
  foto: null,
  nome: null,
  dialog: {}
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
    // console.log('getFotoProfilo', LocalStorage.getItem('_foto'))
    return LocalStorage.getItem('_foto')
  },
  dialog (state) {
    // console.log('getDialog ok', state)
    return state.dialog
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
    state.foto = value
    // console.log('setFoto', value)
    LocalStorage.set('_foto', value)
  },
  dialog (state, value) {
    // console.log('setDialog', value)
    state.dialog = value
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
