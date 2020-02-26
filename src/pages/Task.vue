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
              <q-item-label class="text-green text-weight-bold text-h5 q-mb-md">Task list</q-item-label>
              <q-item-label class="gray1 text-subtitle1">Completa i task per ottenere VYcoin</q-item-label>
            </q-item-section>
          </q-item>
        </div>

        <div class="col-auto q-mt-xl">
          <q-list class="row justify-center full-height full-width text-center">
            <q-item>
              <q-btn class="btn gray1" size="3em" icon="mdi-shoe-print" rounded stack @click="$router.push({ path: '/task1' })">
                <q-item-section>
                  <q-item-label class="text-h4 text-weight-bold blue">W<span class="text-lowercase">alk</span></q-item-label>
                  <q-item-label class="text-caption">C<span class="text-lowercase">oncediti una passeggiata</span></q-item-label>
                </q-item-section>
              </q-btn>
            </q-item>
            <q-item>
              <q-btn class="btn gray1" size="3em" icon="mdi-sprout" rounded stack disable>
                <q-item-section>
                  <q-item-label class="text-h4 text-weight-bold blue">P<span class="text-lowercase">lant</span></q-item-label>
                  <q-item-label class="text-caption">P<span class="text-lowercase">ianta un albero nel tuo giardino</span></q-item-label>
                </q-item-section>
              </q-btn>
            </q-item>
            <q-item>
              <q-btn class="btn gray1" size="3em" icon="mdi-recycle" rounded stack disable>
                <q-item-section>
                  <q-item-label class="text-h4 text-weight-bold blue">R<span class="text-lowercase">ecycle</span></q-item-label>
                  <q-item-label class="text-caption">R<span class="text-lowercase">icicla in modo intelligente</span></q-item-label>
                </q-item-section>
              </q-btn>
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
.btn
  border-radius: 20px
  margin-bottom: 10px
  max-width: 50vw
  padding: 20px 0px
  background-color: white
</style>
