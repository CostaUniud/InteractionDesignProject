import { formatDate } from '@/utils/bt.js'
import store from '@/store'

const state = {
  azioni: []
}

const getters = {
  getAzioni (state) {
    // console.log('getAzioni', state.azioni)
    return state.azioni
  }
}

const mutations = {
  setAzioni (state, payload) {
    // console.log('setAzioni', payload)
    state.azioni = payload
  }
}

const actions = {
  salvaAzione (context, payload) {
    return new Promise((resolve, reject) => {
      store.dispatch('db/open')
        .then(db => {
          db.transaction(function (tx) {
            tx.executeSql(
              `CREATE TABLE IF NOT EXISTS azione(
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                coin REAL NOT NULL, 
                data TEXT NOT NULL, 
                tipo TEXT NOT NULL, 
                task TEXT NOT NULL
              )`
            )
            let date = new Date()
            let insert = tx.executeSql(
              `INSERT INTO azione(
                coin,
                data,
                tipo,
                task
              ) VALUES ( ?, ?, ?, ? )`,
              [
                payload.coin,
                formatDate(date),
                payload.tipo,
                payload.task
              ]
            )
            resolve(insert)
          }, function (error) {
            reject(error)
          }, function () {
            // console.log('salvaAzione > ok')
          })
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  ottieniAzioni (context) {
    return new Promise((resolve, reject) => {
      store.dispatch('db/open')
        .then((db) => {
          db.transaction(function (tx) {
            tx.executeSql(
              `SELECT * 
              FROM azione
              ORDER BY id DESC`,
              [],
              function (tx, resultSet) {
                let response = []
                for (let r = 0; r < resultSet.rows.length; r++) {
                  // console.log('ottini afeonjefa', resultSet.rows.item(r))
                  response.push(resultSet.rows.item(r))
                }
                context.commit('setAzioni', response)
                resolve(response)
              }, function (error) {
                reject(error)
              }
            )
          }, function (error) {
            reject(error)
          }, function () {
            // console.log('ottieniAzioni transaction ok')
          })
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  cancellaAzioni () {
    return new Promise((resolve, reject) => {
      store.dispatch('db/open')
        .then(db => {
          db.transaction(function (tx) {
            tx.executeSql('DELETE FROM azione', [])
            resolve(true)
          }, function (error) {
            reject(error)
          }, function () {
            // console.log('cancellaAzioni > ok')
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
