<template>
  <q-layout view="hHr Lpr lFr">
    <q-header>
      <q-toolbar class="bg-white text-green" style="height: 50px">
        <q-btn flat dense round icon="keyboard_arrow_left" aria-label="Indietro" v-go-back=" '/azioni' "/>

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
              <q-item-label class="text-green text-weight-bold text-h5 q-mb-md">Events</q-item-label>
              <q-item-label class="gray1 text-subtitle1">Partecipa con noi!</q-item-label>
            </q-item-section>
          </q-item>
        </div>

        <div class="col-auto q-mt-xl">
          <q-list class="row justify-center full-height full-width text-center">
            <q-item>
              <q-card class="evento">
                <q-card-section class="q-pa-none">
                  <q-img src="@/assets/recycle_event.jpg" class="img">
                    <div class="absolute-bottom text-h6 text-center text-weight-bold">
                      Giornata del riciclo
                    </div>
                  </q-img>
                  <q-card-section>
                    <div class="text-left gray1">Lo smaltimento dei rifiuti speciali. Scopri come diminuire l'impatto ambientale.</div>
                  </q-card-section>
                </q-card-section>

                <q-separator />

                <q-card-actions class="gray1">
                  <q-btn flat round icon="event" class="blue"/>
                  <q-btn flat class="blue">
                    15:30
                  </q-btn>
                  <q-btn flat class="blue">
                    17:00
                  </q-btn>
                  <q-btn flat class="blue">
                    Piazza Cavour
                  </q-btn>
                </q-card-actions>
              </q-card>
            </q-item>
          </q-list>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
    }
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
