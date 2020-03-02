<template>
  <q-layout view="hHr Lpr lFr">
    <q-header>
      <q-toolbar class="bg-white text-green" style="height: 50px">
        <q-btn flat dense round icon="keyboard_arrow_left" aria-label="Indietro" v-go-back=" '/azioni' "/>

        <q-toolbar-title class="text-center q-pt-sm">
          <img src="@/assets/vyca_logo.png" style="height: 50px; max-width: 200px"/>
        </q-toolbar-title>

        <q-btn flat dense round disable/>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="sfondo column">
        <div class="flex justify-center">
          <q-item>
            <q-item-section class="text-center q-mt-xl">
              <q-item-label class="text-green text-weight-bold text-h5 q-mb-md">Eventi</q-item-label>
              <q-item-label class="gray1 text-subtitle1">Partecipa con noi!</q-item-label>
            </q-item-section>
          </q-item>
        </div>

        <div class="col-auto q-mt-xl">
          <q-virtual-scroll v-if="getEventi.length > 0" :items="getEventi" class="row justify-center full-height full-width text-center">
            <template v-slot="{ item, index }">
              <q-item :key="index">
                <q-card class="evento">
                  <q-card-section class="q-pa-none">
                    <q-img src="@/assets/recycle_event.jpg" class="img">
                      <div class="absolute-bottom text-h6 text-center text-weight-bold">
                        {{ item.nome }}
                      </div>
                    </q-img>
                    <q-card-section>
                      <div class="text-left gray1">{{ item.descrizione }}</div>
                    </q-card-section>
                  </q-card-section>

                  <q-separator />

                  <q-card-actions class="gray1">
                    <q-btn flat round icon="event" color="red"/>
                    <q-item-label flat class="blue">
                      {{ item.data }}, {{ item.luogo }}
                    </q-item-label>
                  </q-card-actions>
                </q-card>
              </q-item>
            </template>
          </q-virtual-scroll>
          <div v-else class="absolute-center text-center q-gutter-y-md">
            <q-icon name="not_interested" class="text-grey-4" style="font-size: 4em"></q-icon>
            <div class="text-h6 text-grey-6">Nessun evento al momento</div>
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
    // Refresh lista eventi
    await this.ottieniEventi()
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log('ottieniEventi > error', error)
      })
  },
  computed: {
    ...mapGetters({
      'getEventi': 'eventi/getEventi'
    })
  },
  methods: {
    ...mapActions({
      'ottieniEventi': 'eventi/ottieniEventi'
    })
  }
}
</script>

<style lang="sass" scoped>
.q-header
  box-shadow: 0px 10px 10px -10px rgba(0,0,0,0.1)
.img
  border-top-left-radius: 20px
  border-top-right-radius: 20px
.evento
  border-radius: 20px
  width: 100%
  max-width: 350px
</style>
