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
              <q-item-section class="text-center">
                <q-item-label class="gray1 text-body1">
                  Hai intenzione di farti una bella camminata? Ottimo! Ne siamo felicissimi! Appena ti sei allacciato le scarpe e varcato la porta
                  di casa premi il pulsante <span class="text-weight-bold">Inizia</span>! Guadagnerai VYcoin finché continuerai a camminare!
                  In qualsiasi momento puoi premere <span class="text-weight-bold">Stop</span> per interrompere il task.
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <q-item>
          <q-item-section>
            <q-btn class="bg-green btn inizia text-white" rounded @click="avvia()">
              <q-item-section class="text-center">
                <q-item-label class="text-h4 text-weight-bold">I<span class="text-lowercase">nizia</span></q-item-label>
              </q-item-section>
            </q-btn>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-btn class="bg-white btn" rounded @click="stop()">
              <q-item-section class="text-center">
                <q-item-label class="gray1 text-h5">S<span class="text-lowercase">top</span></q-item-label>
              </q-item-section>
            </q-btn>
          </q-item-section>
        </q-item>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { getCurrentPosition, stopWatchPosition, getCoin, setCoin, getDistanzaPercorsa, setDistanzaPercorsa } from '@/utils/bt.js'
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
      'getWatchID': 'conf/getWatchID'
    })
  },
  methods: {
    ...mapMutations({
      'setWatchID': 'conf/setWatchID'
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
      var firstTime = true

      return new Promise((resolve, reject) => {
        var watchID = navigator.geolocation.watchPosition(
          function onWatchSuccess (position) {
            if (firstTime) {
              document.addEventListener('deviceready', function () {
                cordova.plugins.backgroundMode.enable()
                console.log('entro in deviceready')
              }, false)

              that.$q.loading.hide()

              that.$store.commit('conf/dialog', {
                visible: true,
                icon: 'mdi-shoe-print',
                color: 'green',
                textColor: 'white',
                label: 'La task è attiva! Goditi la passeggiata!',
                actions: [
                  {
                    label: 'Chiudi',
                    color: 'green',
                    action: () => {
                      that.$store.commit('conf/dialog', {})
                    }
                  }
                ]
              })
              firstTime = false
            }
            that.setWatchID(watchID)

            let updatedLatitude = Math.round(position.coords.latitude * 100000) / 100000
            let updatedLongitude = Math.round(position.coords.longitude * 100000) / 100000

            if (updatedLatitude !== that.latitudine && updatedLongitude !== that.longitudine) {
              that.latitudine = updatedLatitude
              that.longitudine = updatedLongitude

              that.speed = position.coords.speed * 3.6

              if (that.speed > 4 && that.speed < 10) {
                setDistanzaPercorsa(getDistanzaPercorsa() + (that.speed * (1 / 3600)))
                setCoin(getCoin() + 0.1)
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
    stop () {
      stopWatchPosition(this.getWatchID)

      cordova.plugins.backgroundMode.disable()

      this.$store.commit('conf/dialog', {
        visible: true,
        icon: 'mdi-clipboard-check-outline',
        color: 'green',
        textColor: 'white',
        label: 'Task terminata! Corri nel tuo profilo per vedere quanti VYcoin hai guadagnato!',
        actions: [
          {
            label: 'Chiudi',
            color: 'green',
            action: () => {
              this.$store.commit('conf/dialog', {})
            }
          }
        ]
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.q-header
  box-shadow: 0px 10px 10px -10px rgba(0,0,0,0.1)
.btn
  border-radius: 20px
  width: 90vw
  height: 100px
.inizia
  height: 120px
</style>
