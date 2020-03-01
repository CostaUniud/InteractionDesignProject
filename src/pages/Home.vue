<template>
  <div>
    <q-tabs
      v-model="tab"
      dense
      class="text-grey bg-white"
      active-color="green"
      indicator-color="green"
      align="justify"
      narrow-indicator
    >
      <q-tab name="map" label="Mappa" icon="map"/>
      <q-tab name="dash" label="Dashboard" icon="mdi-chart-bar"/>
    </q-tabs>
    <q-tab-panels v-model="tab" animated class="sfondo">
      <q-tab-panel name="map" class="q-pa-none">
        <Mappa/>
      </q-tab-panel>

      <q-tab-panel name="dash" class="q-pa-none">
        <Dashboard/>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import Mappa from '@/components/Mappa'
import Dashboard from '@/components/Dashboard'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      tab: 'map'
    }
  },
  components: {
    Mappa, Dashboard
  },
  mounted () {
    this.setTab('home')
  },
  computed: {
    ...mapGetters({
      'datiAria': 'aria/getAria'
    })
  },
  methods: {
    ...mapMutations({
      'setTab': 'conf/setTab'
    })
  }
}
</script>

<style lang="sass" scoped>
</style>
