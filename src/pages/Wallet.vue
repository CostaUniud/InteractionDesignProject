<template>
  <q-layout view="hHr Lpr lFr">
    <q-header>
      <q-toolbar class="bg-white text-green" style="height: 50px">
        <q-btn flat dense round icon="keyboard_arrow_left" aria-label="Indietro" v-go-back=" '/profilo' "/>

        <q-toolbar-title class="text-center q-pt-sm">
          <img src="@/assets/vyca_logo.png" style="height: 50px; max-width: 200px" />
        </q-toolbar-title>

        <q-btn flat dense round disable/>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="sfondo column">
        <div class="flex justify-center q-pb-none">
          <q-item>
            <q-item-section class="text-center q-mt-xl">
              <q-item-label class="text-green text-weight-bold text-h5 q-mb-md">Wallet</q-item-label>
              <q-item-label class="gray1 text-subtitle1">Reconto task e acquisti</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-btn class="bg-green" color="white" rounded @click="$router.push({ path: '/acquisti' })" style="height: 70px">
                <q-item-section class="text-center">
                  <q-item-label class="text-h4 text-weight-bold border-radius">A<span class="text-lowercase">cquisti</span></q-item-label>
                </q-item-section>
                <q-item-section avatar>
                  <q-icon size="3em" name="mdi-shopping-outline"/>
                </q-item-section>
              </q-btn>
            </q-item-section>
          </q-item>
        </div>

        <div class="col-auto q-mt-xs">
          <q-item>
            <q-item-section class="q-pl-md">
              <q-item-label class="gray1 text-subtitle2">Ultime task svolte</q-item-label>
            </q-item-section>
          </q-item>
          <q-virtual-scroll v-if="getAzioni.length > 0" :items="getAzioni" separator>
            <template v-slot="{ item, index }">
              <q-item :key="index" class="bg-white">
                <!-- Coin -->
                <q-item-section avatar>
                  <q-badge :color="tipo(item.tipo)" round dense>
                    <q-item-label class="text-body1">
                      + {{ item.coin }}
                    </q-item-label>
                  </q-badge>
                </q-item-section>
                <!-- Icona -->
                <q-item-section avatar>
                  <q-avatar rounded>
                    <q-icon :name="icona(item.task)" style="font-size: 2rem;"/>
                  </q-avatar>
                </q-item-section>
                <!-- Tipo -->
                <q-item-section>
                  <q-item-label class="text-h6 gray1 text-weight-bold">
                    {{ item.task }}
                  </q-item-label>
                  <q-item-label caption lines="2">
                    {{ item.data }}
                  </q-item-label>
                </q-item-section>
                <!-- Task -->
                <q-item-section side>
                  <q-btn :color="tipo(item.tipo)" unelevated @click="$router.push({ path: `/${item.task}` })">
                    <q-item-label class="text-center text-body1 text-weight-bold">
                      R<span class="text-lowercase">ipeti</span>!
                    </q-item-label>
                  </q-btn>
                </q-item-section>
              </q-item>
            </template>
          </q-virtual-scroll>
          <div v-else class="absolute-center text-center q-gutter-y-md">
            <q-icon name="not_interested" class="text-grey-4" style="font-size: 4em"></q-icon>
            <div class="text-h6 text-grey-6">Nessuna task ancora realizzata.</div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
    }
  },
  async beforeMount () {
    // Refresh lista azioni
    await this.ottieniAzioni()
      .then(res => {
        // console.log(res)
      })
      .catch(error => {
        console.log('ottieniAzioni > error', error)
      })
  },
  computed: {
    ...mapGetters({
      'getAzioni': 'azioni/getAzioni'
    })
  },
  methods: {
    ...mapActions({
      'ottieniAzioni': 'azioni/ottieniAzioni'
    }),
    tipo (tipo) {
      let colore
      switch (tipo) {
        case 'aria':
          colore = 'blue'
          break
        case 'verde':
          colore = 'green'
          break
        case 'mobilita':
          colore = 'red'
          break
        case 'energia':
          colore = 'yellow'
          break
        default:
          colore = 'green'
          break
      }
      return colore
    },
    icona (task) {
      let nome
      switch (task) {
        case 'walk':
          nome = 'mdi-shoe-print'
          break
        default:
          nome = 'mdi-clipboard-check-outline'
          break
      }
      return nome
    }
  }
}
</script>

<style lang="sass" scoped>
.q-header
  box-shadow: 0px 10px 10px -10px rgba(0,0,0,0.1)
</style>
