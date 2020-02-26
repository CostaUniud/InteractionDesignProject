<template>
  <q-carousel
    v-model="slide"
    swipeable
    transition-prev="slide-right"
    transition-next="slide-left"
    animated
    control-color="white"
    navigation
    padding
    height="100vh"
    class="text-white outline"
    ref="carousel"
  >
    <q-carousel-slide :name="1" class="column no-wrap flex-center" img-src="@/assets/carousel1.jpeg" img-style="filter: grayscale(100%);">
      <q-btn :ripple="false" round color="green" size="40px">
        <img src="@/assets/icona.png" style="height: 75px; max-width: 75px"/>
      </q-btn>
      <div class="q-mt-xl text-center">
        <q-item-label class="text-white text-center text-weight-bold text-h5 q-mb-xl">Visualizza</q-item-label>
        {{ testo1 }}
      </div>
    </q-carousel-slide>
    <q-carousel-slide :name="2" class="column no-wrap flex-center" img-src="@/assets/carousel2.jpeg">
      <q-btn :ripple="false" round color="green" icon="mdi-earth" size="40px"/>
      <div class="q-mt-xl text-center">
        <q-item-label class="text-white text-center text-weight-bold text-h5 q-mb-xl">Agisci</q-item-label>
        {{ testo2 }}
      </div>
    </q-carousel-slide>
    <q-carousel-slide :name="3" class="column no-wrap flex-center" img-src="@/assets/carousel3.jpeg">
      <q-btn :ripple="false" round color="green" icon="mdi-hand-heart" size="40px"/>
      <div class="q-mt-xl text-center">
        <q-item-label class="text-white text-center text-weight-bold text-h5 q-mb-xl">Migliora</q-item-label>
        {{ testo3 }}
      </div>
      <div class="row justify-center q-mt-xl">
        <q-btn rounded class="text-white q-pa-xs" color="green" label="Comincia subito" @click="goTo()"/>
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script>
import { setLogin } from '@/utils/bt.js'

export default {
  data () {
    return {
      slide: 1,
      testo1: 'Benvenuto su Vyca! Qua potrai visualizzare i dati sulla salute della tua città, il tuo impatto ambientale e il suo andamento. Con le nuove tecnologie sarà la città stessa a dirti direttamente come sta, minuto per minuto!',
      testo2: 'Vyca non si ferma ai dati: d\'ora in avanti puoi agire per migliorare la città e l\'ambiente partecipando attivamente alla creazione di un futuro smart e green.',
      testo3: 'Migliora la città, migliori tu. E non solo! I tuoi sforzi vengono ricompensati! Tramite Vyca potrai ottenere immediatamente e comodamente sconti e vantaggi per ogni tua buona azione.'
    }
  },
  methods: {
    goTo () {
      setLogin('Ok')
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style lang="sass" scoped>
.q-chip
  border-radius: 100px
</style>
