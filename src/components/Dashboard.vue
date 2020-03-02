<template>
  <q-list class="q-gutter-xs row">
    <q-item>
      <q-item-section>
        <q-card class="my-card">
          <q-card-section>
            <BarAir/>
          </q-card-section>
        </q-card>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-card class="my-card particelle">
          <q-card-section class="q-pb-xs">
            <q-item-label class="gray1 text-h5 text-weight-light" style="font-size: 1.3em">Particles</q-item-label>
          </q-card-section>
          <q-card-section class="q-pt-xs">
            <q-item dense class="q-pa-xs">
              <q-item-section>
                <q-item-label class="gray1 text-weight-bold text-left text-body1">PM2.5</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-red text-weight-bold text-right text-body1">55mg</q-item-label>
              </q-item-section>
            </q-item>
            <q-item dense class="q-pa-xs">
              <q-item-section >
                <q-item-label class="gray1 text-weight-bold text-left text-body1">PM10</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-red text-weight-bold text-right text-body1">68mg</q-item-label>
              </q-item-section>
            </q-item>
            <q-item dense class="q-pa-xs">
              <q-item-section>
                <q-item-label class="gray1 text-weight-bold text-left text-body1">CO</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-red text-weight-bold text-right text-body1">{{ datiAria ? datiAria : 0 }}mg</q-item-label>
              </q-item-section>
            </q-item>
            <q-item dense class="q-pa-xs">
              <q-item-section>
                <q-item-label class="gray1 text-weight-bold text-left text-body1">NO2</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="azure text-weight-bold text-right text-body1">68mo</q-item-label>
              </q-item-section>
            </q-item>
            <q-item dense class="q-pa-xs">
              <q-item-section>
                <q-item-label class="gray1 text-weight-bold text-left text-body1">NH3</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="azure text-weight-bold text-right text-body1">37mo</q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-card class="my-card particelle bg-green">
          <q-card-section class="q-pb-xs">
            <q-item-label class="text-white text-h5 text-weight-light" style="font-size: 1.3em">Footprint</q-item-label>
          </q-card-section>
          <q-card-section class="q-pb-xs text-center">
            <q-item-label class="text-white text-h3 text-weight-bold">{{ !getDistanzaPercorsa() ? 0 : (Math.round(getDistanzaPercorsa() * 120)) }} g</q-item-label>
          </q-card-section>
        </q-card>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { getDistanzaPercorsa } from '@/utils/bt.js'
import BarAir from '@/components/charts/BarAir'
import { mapGetters } from 'vuex'

export default {
  components: {
    BarAir
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      'datiAria': 'aria/getAria'
    })
  },
  methods: {
    getDistanzaPercorsa
  }
}
</script>

<style lang="sass" scoped>
.my-card
  border-radius: 20px
.particelle
  min-width: 40vw
  height: 220px
</style>
