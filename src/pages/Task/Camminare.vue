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
            <q-item class="q-pt-none">
              <q-item-section class="text-center gray1 text-body1">
                <q-item-label>
                  Hai intenzione di farti una bella camminata? Ottimo!
                  <br>Premi il pulsante <span class="text-weight-bold">Avvia</span>!
                  <br>Guadagnerai VYcoin finché continuerai a camminare! In qualsiasi momento premi <span class="text-weight-bold">Ferma</span> per terminare il task.
                </q-item-label>
                <q-item-label>
                  <br><span class="text-weight-bold">Ricorda:</span> Vyca controllerà che tu stia camminando anche se spegni lo schermo o usi un'altra app, ma se la chiudi non potrà
                  farlo.
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="fixed-bottom q-mb-xl">
          <q-item v-if="getBtnWalkStatus">
            <q-item-section>
              <q-btn class="bg-green btn inizia text-white" rounded @click="avvia()">
                <q-item-section class="text-center">
                  <q-item-label class="text-h4 text-weight-bold">A<span class="text-lowercase">vvia</span></q-item-label>
                </q-item-section>
              </q-btn>
            </q-item-section>
          </q-item>
          <q-item v-else>
            <q-item-section>
              <q-btn class="bg-white btn" rounded @click="stop()">
                <q-item-section class="text-center">
                  <q-item-label class="green text-h5">F<span class="text-lowercase">erma</span></q-item-label>
                </q-item-section>
              </q-btn>
            </q-item-section>
          </q-item>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { getCurrentPosition, stopWatchPosition, getCoin, setCoin, getDistanzaPercorsa, setDistanzaPercorsa,
  getNome, getDistanzaPercorsaTask, setDistanzaPercorsaTask, getCoinTask, setCoinTask, getCoinAria, setCoinAria } from '@/utils/bt.js'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  data () {
    return {
      latitude: 0,
      longitude: 0
    }
  },
  computed: {
    ...mapGetters({
      'getWatchID': 'conf/getWatchID',
      'getBtnWalkStatus': 'conf/getBtnWalkStatus'
    })
  },
  methods: {
    ...mapMutations({
      'setWatchID': 'conf/setWatchID',
      'setBtnWalkStatus': 'conf/setBtnWalkStatus'
    }),
    ...mapActions({
      'salvaAzione': 'azioni/salvaAzione'
    }),
    async avvia () {
      this.$q.loading.show({ message: 'Rilevando posizione...' })
      let position = await getCurrentPosition()

      this.latitude = Math.round(position.coords.latitude * 100000) / 100000
      this.longitude = Math.round(position.coords.longitude * 100000) / 100000

      this.watchPosition()
    },
    watchPosition () {
      var that = this
      var firstTime = true
      var count = 0
      var debugMode = true
      setDistanzaPercorsaTask(0)
      setCoinTask(0)

      return new Promise((resolve, reject) => {
        var watchID = navigator.geolocation.watchPosition(
          function onWatchSuccess (position) {
            if (firstTime) {
              cordova.plugins.backgroundMode.enable()

              that.$q.loading.hide()
              that.setBtnWalkStatus(false)
              that.$store.commit('conf/dialog', {
                visible: true,
                icon: 'mdi-shoe-print',
                color: 'green',
                textColor: 'white',
                class: 'text-body1 gray1',
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
            let speed = position.coords.speed * 3.6

            count++

            if (debugMode) {
              let speed = 10
              setDistanzaPercorsaTask(getDistanzaPercorsaTask() + (speed * (1 / 3600)))
              setDistanzaPercorsa(getDistanzaPercorsa() + (speed * (1 / 3600)))
              let coinTaskOld = getCoinTask()
              setCoinTask(10 * getDistanzaPercorsaTask())
              setCoin(getCoin() + getCoinTask() - coinTaskOld)
            }

            if (updatedLatitude !== that.latitude || updatedLongitude !== that.longitude) {
              that.latitude = updatedLatitude
              that.longitude = updatedLongitude

              if (speed > 4 && speed < 10 && count > 60) {
                setDistanzaPercorsaTask(getDistanzaPercorsaTask() + (speed * (1 / 3600)))
                setDistanzaPercorsa(getDistanzaPercorsa() + (speed * (1 / 3600)))
                let coinTaskOld = getCoinTask()
                setCoinTask(10 * getDistanzaPercorsaTask())
                setCoin(getCoin() + getCoinTask() - coinTaskOld)
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
    async stop () {
      stopWatchPosition(this.getWatchID)

      cordova.plugins.backgroundMode.disable()

      var payload = {
        coin: Math.round(getCoinTask() * 100) / 100,
        tipo: 'aria',
        task: 'walk'
      }

      if (Math.round(getDistanzaPercorsaTask() * 100) / 100 !== 0 && Math.round(getCoinTask() * 100) / 100 !== 0) {
        this.$q.loading.show({ message: 'Salvando azione...' })

        setCoinAria(getCoinAria() + getCoinTask())

        await this.salvaAzione(payload)
          .then(res => {
            this.$q.loading.hide()
            this.$store.commit('conf/dialog', {
              visible: true,
              icon: 'mdi-clipboard-check-outline',
              color: 'blue',
              textColor: 'white',
              class: 'text-body1 gray1',
              label: 'Bravo ' + (getNome() ? getNome() : 'Francesco') + '! Hai fatto ' + (Math.round(getDistanzaPercorsaTask() * 100) / 100) + 'km e hai guadagnato ' + (Math.round(getCoinTask() * 100) / 100) + ' VYcoin. L\'ambiente ti ringrazia!',
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
            setDistanzaPercorsaTask(0)
            setCoinTask(0)
          })
          .catch(error => {
            console.log('salvaAzione > error', error)
            this.$q.loading.hide()
            this.$q.notify({
              color: 'negative',
              message: 'Azione non salvata',
              icon: 'warning'
            })
          })
      } else {
        this.$store.commit('conf/dialog', {
          visible: true,
          icon: 'mdi-emoticon-sad-outline',
          color: 'yellow',
          textColor: 'white',
          class: 'text-body1 gray1',
          label: 'Ci spiace, non hai guadagnato nessun VYcoin. Prova a premere Inizia e a camminare!',
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

      this.setBtnWalkStatus(true)
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
