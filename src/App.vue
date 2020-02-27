<template>
  <div id="q-app">
    <router-view />
    <bt-dialog :params="dialog" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BtDialog from '@/components/BtDialog'

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
      'dialog': 'conf/dialog'
    })
  },
  mounted () {
    window.screen.orientation.lock('portrait')

    cordova.plugins.backgroundMode.on('activate', function () {
      console.log('entro in backgroundMode active')
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
// .poppins
//   font-family: 'Poppins'
// .yellow
//   color: $yellow
// .sfondo-green
//   background-color: $green
</style>
