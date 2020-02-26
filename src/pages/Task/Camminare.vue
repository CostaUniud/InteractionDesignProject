<template>
  <q-layout view="hHr Lpr lFr">
    <q-header>
      <q-toolbar class="bg-white text-green" style="height: 50px">
        <q-btn flat dense round icon="keyboard_arrow_left" aria-label="Indietro" v-go-back=" '/azioni' "/>

        <q-toolbar-title class="text-center q-pt-sm">
          <img src="@/assets/vyca_logo.png" style="height: 50px; max-width: 200px" />
        </q-toolbar-title>

        <q-btn flat dense round disable/>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="sfondo column">
        <div class="flex justify-center">
          <q-item>
            <q-item-section class="text-center q-mt-xl">
              <q-item-label class="text-green text-weight-bold text-h5 q-mb-md">Walk</q-item-label>
              <q-item-label class="gray1 text-subtitle1">Più cammini, più guadagni!</q-item-label>
            </q-item-section>
          </q-item>
        </div>

        <div class="col-auto q-mt-xl">
          <q-list>
            <q-item>
              Descrizione azione...
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Latitudine: {{ latitudine }}</q-item-label>
                <q-item-label>Longitudine: {{ longitudine }}</q-item-label>
                <q-item-label>Speed: {{ speed }}</q-item-label>
                <q-item-label>DistanzaPercorsa: {{ !getDistanzaPercorsa ? 0 : Math.round(getDistanzaPercorsa * 100) / 100 }} km</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <q-item>
          <q-btn rounded class="btn bg-white text-red text-h5" label="Inizia" @click="avvia()"/>
        </q-item>
        <q-item>
          <q-btn rounded class="btn bg-white text-red text-h5" label="Stop" @click="stopWatchPosition(getWatchID)"/>
        </q-item>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { getCurrentPosition, stopWatchPosition } from '@/utils/bt.js'
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      latitudine: null,
      longitudine: null,
      speed: null
    }
  },
  computed: {
    ...mapGetters({
      'getWatchID': 'conf/getWatchID',
      'getStartPosition': 'conf/getStartPosition',
      'getEndPosition': 'conf/getEndPosition',
      'getDistanzaPercorsa': 'conf/getDistanzaPercorsa',
      'getCoin': 'conf/getCoin'
    })
  },
  methods: {
    ...mapMutations({
      'setWatchID': 'conf/setWatchID',
      'setStartPosition': 'conf/setStartPosition',
      'setEndPosition': 'conf/setEndPosition',
      'setDistanzaPercorsa': 'conf/setDistanzaPercorsa',
      'setCoin': 'conf/setCoin'
    }),
    async avvia () {
      this.$q.loading.show({ message: 'Rivelando posizione...' })
      let position = await getCurrentPosition()

      this.latitude = Math.round(position.coords.latitude * 100000) / 100000
      this.longitudine = Math.round(position.coords.longitudine * 100000) / 100000

      this.watchPosition()
    },
    watchPosition () {
      var that = this

      return new Promise((resolve, reject) => {
        var watchID = navigator.geolocation.watchPosition(
          function onWatchSuccess (position) {
            that.$q.loading.hide()

            that.setWatchID(watchID)

            let updatedLatitude = Math.round(position.coords.latitude * 100000) / 100000
            let updatedLongitude = Math.round(position.coords.longitude * 100000) / 100000

            that.setDistanzaPercorsa(that.getDistanzaPercorsa + (that.speed * (1 / 3600)))

            if (updatedLatitude !== that.latitudine && updatedLongitude !== that.longitudine) {
              that.latitudine = updatedLatitude
              that.longitudine = updatedLongitude

              that.speed = position.coords.speed * 3.6

              if (that.speed > 4 && that.speed < 10) {
                that.setDistanzaPercorsa(that.getDistanzaPercorsa + (that.speed * (1 / 3600)))
                that.setCoin(that.getCoin + 0.1)
              }
            }
            resolve(true)
          },
          function onError (error) {
            reject(error)
          },
          { timeout: 30000, enableHighAccuracy: true }
        )
      })
    },
    stopWatchPosition
  }
}
</script>

<style lang="sass" scoped>
.q-header
  box-shadow: 0px 10px 10px -10px rgba(0,0,0,0.1)
.btn
  border-radius: 35px
  width: 90vw
  height: 17vh
</style>
