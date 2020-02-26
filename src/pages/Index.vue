<template>
  <q-page id="main" class="sfondo">
    <q-tab-panels v-model="tab" animated class="sfondo">
      <q-tab-panel name="azioni" class="q-pa-none">
        <Azioni/>
      </q-tab-panel>

      <q-tab-panel name="home" class="q-pa-none">
        <Home/>
      </q-tab-panel>

      <q-tab-panel name="profilo" class="q-pa-none">
        <Profilo/>
      </q-tab-panel>
    </q-tab-panels>
    <q-footer>
      <q-tabs
        v-model="tab"
        dense
        class="bg-white text-grey-7"
        active-color="green"
        indicator-color="green"
        align="justify"
        style="height: 50px"
      >
        <q-tab name="azioni" icon="more_horiz"/>
        <q-tab name="home" icon="mdi-home-outline"/>
        <q-tab name="profilo" icon="mdi-account-outline"/>
      </q-tabs>
    </q-footer>
  </q-page>
</template>

<script>
import Home from '@/pages/Home'
import Profilo from '@/pages/Profilo'
import Azioni from '@/pages/Azioni'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PageIndex',
  data () {
    return {
      tab: ''
    }
  },
  components: {
    Home,
    Profilo,
    Azioni
  },
  mounted () {
    // this.ottieniDatiAria()
    this.tab = this.getTab
  },
  computed: {
    ...mapGetters({
      'getTab': 'conf/getTab'
    })
  },
  methods: {
    ...mapActions({
      'ottieniDatiAria': 'aria/fetch'
    })
  }
}
</script>

<style lang="sass" scoped>
.q-footer
  box-shadow: 0px -10px 10px -10px rgba(0,0,0,0.1)
</style>
