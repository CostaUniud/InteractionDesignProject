import { formatDate } from '@/utils/bt.js'
import store from '@/store'

const state = {
  azioni: []
}

const getters = {
  getAzioni (state) {
    console.log('getAzioni', state.azioni)
    return state.azioni
  }
}

const mutations = {
  setAzioni (state, payload) {
    console.log('setAzioni', payload)
    state.azioni = payload
  }
}

const actions = {
  salvaAzione (context, coin, tipo, task) {
    return new Promise((resolve, reject) => {
      store.dispatch('db/open')
        .then(db => {
          db.transaction(function (tx) {
            // tx.executeSql('DELETE FROM azione', [])
            tx.executeSql(
              `CREATE TABLE IF NOT EXISTS azione(
                id_azione INTEGER NOT NULL,
                coin VARCHAR(1) TEXT NOT NULL,
                data TEXT NOT NULL,
                tipo TEXT NOT NULL,
                task TEXT NOT NULL,
                PRIMARY KEY (id_azione)
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
                coin,
                formatDate(date),
                tipo,
                task
              ]
            )
            resolve(insert)
          }, function (error) {
            reject(error)
          }, function () {
            console.log('salvaAzione > ok')
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
              ORDER BY id_azione DESC`,
              [],
              function (tx, resultSet) {
                let response = []
                for (let r = 0; r < resultSet.rows.length; r++) {
                  resultSet.rows.item(r).azione = JSON.parse(resultSet.rows.item(r).azione)
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
            console.log('ottieniAzioni transaction ok')
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
