import { LocalStorage } from 'quasar'

const state = {
  tab: 'home',
  watchID: '',
  startPosition: null,
  endPosition: null,
  distanzaPercorsa: null,
  foto: null,
  coin: null,
  nome: null
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
  getStartPosition (state) {
    // console.log('getStartPosition', state.startPosition)
    return state.startPosition
  },
  getEndPosition (state) {
    // console.log('getEndPosition', state.endPosition)
    return state.endPosition
  },
  getDistanzaPercorsa (state) {
    // console.log('getDistanzaPercorsa', LocalStorage.getItem('_dist'))
    return LocalStorage.getItem('_dist')
  },
  getCoin (state) {
    // console.log('getCoin', LocalStorage.getItem('_coin'))
    return LocalStorage.getItem('_coin')
  },
  getNome (state) {
    console.log('getNome', LocalStorage.getItem('_nome'))
    return LocalStorage.getItem('_nome')
  },
  getFotoProfilo (state) {
    // console.log('getFotoProfilo', LocalStorage.getItem('_foto'))
    return LocalStorage.getItem('_foto')
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
  setStartPosition (state, value) {
    // console.log('setStartPosition', value)
    state.startPosition = value
  },
  setEndPosition (state, value) {
    // console.log('setEndPosition', value)
    state.endPosition = value
  },
  setDistanzaPercorsa (state, value) {
    state.distanzaPercorsa = value
    // console.log('setDistanzaPercorsa', value)
    LocalStorage.set('_dist', value)
  },
  setCoin (state, value) {
    state.coin = value
    // console.log('setCoin', value)
    LocalStorage.set('_coin', value)
  },
  setNome (state, value) {
    state.nome = value
    console.log('setNome', value)
    LocalStorage.set('_nome', value)
  },
  setFotoProfilo (state, value) {
    state.foto = value
    // console.log('setFoto', value)
    LocalStorage.set('_foto', value)
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
