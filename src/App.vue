<template>
  <div id="q-app" class="sfondo" :class="getScan ? 'trasparente' : ''">
    <router-view />
    <bt-dialog :params="dialog" />
    <img v-if="getScan" src="@/assets/qr_region.png" id="qr_region">
  </div>
</template>

<script>
import BtDialog from '@/components/BtDialog'
import { LocalStorage } from 'quasar'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      ciao: 'ciao'
    }
  },
  components: {
    BtDialog
  },
  computed: {
    ...mapGetters({
      'dialog': 'conf/dialog',
      'getScan': 'conf/getScan'
    })
  },
  methods: {
    ...mapMutations({
      'setFotoProfilo': 'conf/setFotoProfilo'
    })
  },
  mounted () {
    window.screen.orientation.lock('portrait')

    this.setFotoProfilo(LocalStorage.getItem('_foto'))

    cordova.plugins.backgroundMode.on('activate', function () {
      cordova.plugins.backgroundMode.disableWebViewOptimizations()
    })
  }
}
</script>

<style lang="sass">
#q-app
  font-family: 'Poppins'
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
// .poppins
//   font-family: 'Poppins'
// .yellow
//   color: $yellow
// .sfondo-green
//   background-color: $green
</style>
