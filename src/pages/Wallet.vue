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
        <div class="flex justify-center">
          <q-item>
            <q-item-section class="text-center q-mt-xl">
              <q-item-label class="text-green text-weight-bold text-h5 q-mb-md">Wallet</q-item-label>
              <q-item-label class="gray1 text-subtitle1">Reconto task e acquisti</q-item-label>
            </q-item-section>
          </q-item>
        </div>

        <div class="col-auto q-mt-xl">
          <q-virtual-scroll v-if="getAzioni.length > 0" :items="getAzioni" separator>
            <template v-slot="{ item, index }">
              <q-item :key="index">
                <!-- Coin -->
                <q-item-section avatar>
                  <q-item-label>
                    {{ item.coin }}
                  </q-item-label>
                </q-item-section>
                <!-- Tipo -->
                <q-item-section>
                  <q-item-label>
                    {{ item.tipo }}
                  </q-item-label>
                </q-item-section>
                <!-- Task -->
                <q-item-section side>
                  <q-badge class="bg-transparent text-green">
                    {{ item.task }}
                  </q-badge>
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
    if (this.getAzioni.length > 0) {
      await this.ottieniAzioni()
        .then(res => {
          console.log(res)
        })
        .catch(error => {
          console.log('ottieniAzioni > error', error)
        })
    }
  },
  computed: {
    ...mapGetters({
      'getAzioni': 'azioni/getAzioni'
    })
  },
  methods: {
    ...mapActions({
      'ottieniAzioni': 'azioni/ottieniAzioni'
    })
  }
}
</script>

<style lang="sass" scoped>
.q-header
  box-shadow: 0px 10px 10px -10px rgba(0,0,0,0.1)
</style>
