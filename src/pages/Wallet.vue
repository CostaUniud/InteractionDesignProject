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
              <q-item-label class="gray1 text-subtitle1">Utilizza i premi acquistati</q-item-label>
            </q-item-section>
          </q-item>
        </div>

        <div class="col-auto q-mt-xl">
          <q-list class="row justify-center full-height full-width text-center">
            <q-item class="item2 q-pb-none">
              <q-card class="card q-pb-xs">
                <q-card-section class="q-pa-none">
                  <q-card-section>
                    <div class="text-left gray1 text-h5 text-weight-bolder">Biglietto bus</div>
                  </q-card-section>
                  <q-card-section class="q-pa-none">
                    <q-item dense>
                      <q-item-section>
                        <q-item-label class="text-blue text-weight-bold text-left text-h6">Pordenone</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-icon name="mdi-arrow-right" style="color: gray; font-size: 2em;"/>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="text-blue text-weight-bold text-right text-h6">Venezia</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item dense>
                      <q-item-section>
                        <q-item-label class="gray1 text-weight-bold text-left text-h6">18:30</q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="gray1 text-weight-bold text-right text-h6">20:00</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item dense>
                      <q-item-section>
                        <q-item-label class="gray1 text-weight-bold text-left text-subtitle1">N. 01 ADULTI</q-item-label>
                        <q-item-label class="gray1 text-weight-bold text-left text-subtitle1">CLASSE 2</q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="gray1 text-weight-bold text-right text-subtitle1">km 87</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-card-section>

                  <q-card-section>
                    <q-item-label class="gray1 text-weight-bold text-center text-subtitle2">Convalida</q-item-label>
                    <q-img src="@/assets/qr.svg" class="img" style="height: 200px; width: 200px"/>
                    <q-item-label class="gray1 text-weight-bold text-center text-subtitle2">Codice biglietto: 63541651656</q-item-label>
                  </q-card-section>
                </q-card-section>
              </q-card>
            </q-item>
            <q-item class="item1 q-pb-none">
              <q-card class="card q-pb-xs">
                <q-card-section class="q-pa-none">
                  <q-card-section>
                    <div class="text-left gray1 text-h5 text-weight-bolder">Codice promo</div>
                  </q-card-section>
                  <q-card-section class="q-pa-none">
                    <q-item dense>
                      <q-item-section>
                        <q-item-label class="text-blue text-weight-bold text-left text-h6">Pordenone</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-icon name="mdi-arrow-right" style="color: gray; font-size: 2em;"/>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="text-blue text-weight-bold text-right text-h6">Venezia</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item dense>
                      <q-item-section>
                        <q-item-label class="gray1 text-weight-bold text-left text-h6">18:30</q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="gray1 text-weight-bold text-right text-h6">20:00</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item dense>
                      <q-item-section>
                        <q-item-label class="gray1 text-weight-bold text-left text-subtitle1">N. 01 ADULTI</q-item-label>
                        <q-item-label class="gray1 text-weight-bold text-left text-subtitle1">CLASSE 2</q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="gray1 text-weight-bold text-right text-subtitle1">km 87</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-card-section>

                  <q-card-section>
                    <q-item-label class="gray1 text-weight-bold text-center text-subtitle2">Convalida</q-item-label>
                    <q-img src="@/assets/qr.svg" class="img" style="height: 200px; width: 200px"/>
                    <q-item-label class="gray1 text-weight-bold text-center text-subtitle2">Codice biglietto: 63541651656</q-item-label>
                  </q-card-section>
                </q-card-section>
              </q-card>
            </q-item>
            <q-item class="item3 q-pb-none">
              <q-card class="card q-pb-xs">
                <q-card-section class="q-pa-none">
                  <q-card-section class="">
                    <div class="text-left text-h5 text-weight-bolder azure">Biglietto treno</div>
                  </q-card-section>
                  <q-card-section class="q-pa-none">
                    <q-item dense>
                      <q-item-section>
                        <q-item-label class="text-blue text-weight-bold text-left text-h6">Pordenone</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-icon name="mdi-arrow-right" style="color: gray; font-size: 2em;"/>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="text-blue text-weight-bold text-right text-h6">Venezia</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item dense>
                      <q-item-section>
                        <q-item-label class="gray1 text-weight-bold text-left text-h6">18:30</q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="gray1 text-weight-bold text-right text-h6">20:00</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item dense>
                      <q-item-section>
                        <q-item-label class="gray1 text-weight-bold text-left text-subtitle1">N. 01 ADULTI</q-item-label>
                        <q-item-label class="gray1 text-weight-bold text-left text-subtitle1">CLASSE 2</q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="gray1 text-weight-bold text-right text-subtitle1">km 87</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-card-section>

                  <q-card-section>
                    <q-item-label class="gray1 text-weight-bold text-center text-subtitle2">Convalida</q-item-label>
                    <q-img src="@/assets/qr.svg" class="img" style="height: 200px; width: 200px"/>
                    <q-item-label class="gray1 text-weight-bold text-center text-subtitle2">Codice biglietto: 63541651656</q-item-label>
                  </q-card-section>
                </q-card-section>
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
.card
  border-top-left-radius: 20px
  border-top-right-radius: 20px
  width: 90vw
.item1
  position: absolute
  bottom: 60px
.item2
  position: absolute
  bottom: 120px
.item3
  position: absolute
  bottom: 0px
</style>
