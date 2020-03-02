import { formatDate } from '@/utils/bt.js'
import store from '@/store'

const state = {
  eventi: []
}

const getters = {
  getEventi (state) {
    // console.log('getEventi', state.eventi)
    return state.eventi
  }
}

const mutations = {
  setEventi (state, payload) {
    // console.log('setEventi', payload)
    state.eventi = payload
  }
}

const actions = {
  salvaEvento (context, payload) {
    return new Promise((resolve, reject) => {
      store.dispatch('db/open')
        .then(db => {
          db.transaction(function (tx) {
            tx.executeSql('DELETE FROM evento', [])
            tx.executeSql(
              `CREATE TABLE IF NOT EXISTS evento(
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                nome TEXT NOT NULL, 
                descrizione TEXT NOT NULL, 
                data TEXT NOT NULL, 
                luogo TEXT NOT NULL,
                img BLOB
              )`
            )
            let date = new Date()
            let insert = tx.executeSql(
              `INSERT INTO evento(
                nome,
                descrizione,
                data,
                luogo,
                img
              ) VALUES ( ?, ?, ?, ?, ? )`,
              [
                payload.nome,
                payload.descrizione,
                formatDate(date),
                payload.luogo,
                payload.img
              ]
            )
            resolve(insert)
          }, function (error) {
            reject(error)
          }, function () {
            // console.log('salvaEvento > ok')
          })
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  ottieniEventi (context) {
    return new Promise((resolve, reject) => {
      store.dispatch('db/open')
        .then((db) => {
          db.transaction(function (tx) {
            tx.executeSql(
              `SELECT * 
              FROM evento
              ORDER BY id DESC`,
              [],
              function (tx, resultSet) {
                let response = []
                for (let r = 0; r < resultSet.rows.length; r++) {
                  // console.log('ottieni eventi', resultSet.rows.item(r))
                  response.push(resultSet.rows.item(r))
                }
                context.commit('setEventi', response)
                resolve(response)
              }, function (error) {
                reject(error)
              }
            )
          }, function (error) {
            reject(error)
          }, function () {
            // console.log('ottieniEventi transaction ok')
          })
        })
        .catch(error => {
          reject(error)
        })
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
