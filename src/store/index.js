import Vue from 'vue'
import Vuex from 'vuex'
import aria from './modules/aria'
import conf from './modules/conf'
import db from './modules/db'
import azioni from './modules/azioni'
import eventi from './modules/eventi'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default new Vuex.Store({
  modules: {
    aria,
    conf,
    db,
    azioni,
    eventi
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV
})
