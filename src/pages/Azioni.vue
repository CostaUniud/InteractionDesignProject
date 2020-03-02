<template>
  <div class="sfondo column">
    <div class="flex justify-center">
      <q-item>
        <q-item-section class="text-center q-mt-xl">
          <q-item-label class="text-green text-weight-bold text-h5 q-mb-md">Menu</q-item-label>
          <q-item-label class="gray1 text-subtitle1">Migliora la tua impronta ecologica</q-item-label>
        </q-item-section>
      </q-item>
    </div>

    <div class="col-auto q-mt-xl">
      <q-list class="row justify-center full-height full-width">
        <q-item>
          <q-btn rounded @click="$router.push({ path: '/task' })">
            <q-item-section class="text-left">
              <q-item-label class="text-h4 text-weight-bold">T<span class="text-lowercase">ask</span></q-item-label>
              <q-item-label class="text-caption">C<span class="text-lowercase">ompleta i task per ottenere <span class="text-uppercase">VY</span>coin e sostenere l'ecosistema!</span></q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-icon size="5em" name="mdi-clipboard-check-outline"/>
            </q-item-section>
          </q-btn>
        </q-item>
        <q-item>
          <q-btn rounded @click="$router.push({ path: '/events' })">
            <q-item-section class="text-left">
              <q-item-label class="text-h4 text-weight-bold">E<span class="text-lowercase">venti</span></q-item-label>
              <q-item-label class="text-caption">A<span class="text-lowercase">derisci alle iniziative e dai il tuo contributo!</span></q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-icon size="5em" name="mdi-calendar-month-outline"/>
            </q-item-section>
          </q-btn>
        </q-item>
        <q-item>
          <q-btn rounded @click="$router.push({ path: '/shop' })">
            <q-item-section class="text-left">
              <q-item-label class="text-h4 text-weight-bold">S<span class="text-lowercase">hop</span></q-item-label>
              <q-item-label class="text-caption">S<span class="text-lowercase">pendi i tuoi <span class="text-uppercase">VY</span>coin approfittando delle offerte!</span></q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-icon size="5em" name="mdi-cart-outline"/>
            </q-item-section>
          </q-btn>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
    }
  },
  mounted () {
    this.setTab('azioni')
  },
  methods: {
    ...mapMutations({
      'setTab': 'conf/setTab'
    })
  }
}
</script>

<style lang="sass" scoped>
.q-btn
  border-radius: 20px
  padding: 20px
  background-color: $green
  color: white
</style>
