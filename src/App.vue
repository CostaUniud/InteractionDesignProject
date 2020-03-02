<template>
  <div id="q-app" class="sfondo" :class="getScan ? 'trasparente' : ''">
    <router-view />
    <bt-dialog :params="dialog" />
    <q-btn v-if="getScan" class="btn-close" round color="green" icon="mdi-close" @click="chiudiScan()" size="lg"/>
    <q-btn v-if="getScan" class="btn-light" round color="green" :icon="light ? 'mdi-flashlight-off' : 'mdi-flashlight'" @click="turnOnLight()" size="lg"/>
    <q-btn v-if="getScan" class="btn-reverse" round color="green" icon="mdi-autorenew" @click="reverseCamera()" size="lg"/>
    <img v-if="getScan" src="@/assets/scan.png" id="qr_region">
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import BtDialog from '@/components/BtDialog'

export default {
  name: 'App',
  data () {
    return {
      ciao: 'ciao',
      light: false,
      reverse: false
    }
  },
  components: {
    BtDialog
  },
  async beforeMount () {
    window.screen.orientation.lock('portrait')

    await this.startDb()
  },
  mounted () {
    cordova.plugins.backgroundMode.on('activate', function () {
      cordova.plugins.backgroundMode.disableWebViewOptimizations()
    })
  },
  beforeDestroy () {
    this.getDb.close()
  },
  computed: {
    ...mapGetters({
      'dialog': 'conf/dialog',
      'getDb': 'db/getDb',
      'getScan': 'conf/getScan'
    })
  },
  methods: {
    ...mapMutations({
      'setFotoProfilo': 'conf/setFotoProfilo',
      'setScan': 'conf/setScan'
    }),
    ...mapActions({
      'startDb': 'db/start'
    }),
    turnOnLight () {
      if (!this.light) {
        window.QRScanner.enableLight()
        this.light = true
      } else {
        window.QRScanner.disableLight()
        this.light = false
      }
    },
    reverseCamera () {
      if (!this.reverse) {
        window.QRScanner.useFrontCamera()
        this.reverse = true
      } else {
        window.QRScanner.useBackCamera()
        this.reverse = false
      }
    },
    chiudiScan () {
      window.QRScanner.destroy()
      this.setScan(false)
    }
  }
}
</script>

<style lang="sass">
#q-app
  font-family: 'Poppins'
  scroll-behavior: smooth
.sfondo
  background-color: $gray2
.gray1
  color: $gray1
.blue
  color: $blue
.azure
  color: $azure
.green
  color: $green
.spezza
  text-overflow: ellipsis
  white-space: nowrap
  overflow: hidden
.trasparente
  background-color: transparent
#qr_region
  position: absolute
  width: 80vw
  height: 80vw
  top: calc(50vh - 40vw - 33px)
  left: 10vw
.btn-close
  position: absolute
  top: 8vh
  right: 3vw
.btn-light
  position: absolute
  bottom: 8vh
  left: 30vw
.btn-reverse
  position: absolute
  bottom: 8vh
  right: 30vw
</style>
