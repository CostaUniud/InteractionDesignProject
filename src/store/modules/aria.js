import { connect } from 'mqtt'

const state = {
  aria: null
}

const getters = {
  getAria (state) {
    return state.aria
  }
}

const actions = {
  fetch (context) {
    return new Promise((resolve, reject) => {
      let client = connect('wss://192.168.137.71:8883')
      client.subscribe('air')
      client.on('message', function (topic, message) {
        console.log(message.toString())
        context.commit('setAria', message.toString())
        resolve(true)
      })
      client.on('error', function (error) {
        console.log('Cant connect' + error)
        // client.end()
        reject(error)
      })
    })
  }
}

const mutations = {
  setAria (state, value) {
    // console.log('setAria', value)
    state.aria = value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
