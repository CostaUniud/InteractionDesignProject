<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { stopWatchPosition } from '@/utils/bt.js'

export default {
  name: 'App',
  computed: {
    ...mapGetters({
      'getWatchID': 'conf/getWatchID'
    })
  },
  mounted () {
    window.screen.orientation.lock('portrait')
  },
  destroyed () {
    stopWatchPosition()
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
