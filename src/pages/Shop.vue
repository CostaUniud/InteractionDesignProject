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
              <q-item-label class="text-green text-weight-bold text-h5 q-mb-md">Shop</q-item-label>
              <q-item-label class="gray1 text-subtitle1">Scegli tra i prodotti offerti</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="q-pb-none q-mb-none">
            <q-btn class="bg-green" color="white" rounded @click="$router.push({ path: '/acquisti' })" style="height: 70px">
              <q-item-section class="text-center">
                <q-item-label class="text-h4 text-weight-bold border-radius">A<span class="text-lowercase">cquistati</span></q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-icon size="3em" name="mdi-shopping-outline"/>
              </q-item-section>
            </q-btn>
          </q-item>
        </div>

        <div class="col-auto q-mt-md">
          <div class="row justify-center full-height full-width text-center">
            <q-list>
              <q-item-label class="text-left text-h5 gray1 text-weight-bold" header>Mobilità</q-item-label>
              <q-scroll-area
                horizontal
                style="height: 150px; width: 100vw;"
                class="sfondo q-mb-md"
              >
                <q-list class="row no-wrap">
                  <q-item>
                    <q-btn class="btn gray1" size="2.5em" icon="mdi-bus-side" rounded stack>
                      <q-item-section>
                        <q-item-label class="text-h6 text-weight-bold blue">B<span class="text-lowercase">us</span></q-item-label>
                      </q-item-section>
                    </q-btn>
                  </q-item>
                  <q-item>
                    <q-btn class="btn gray1" size="2.5em" icon="mdi-train" rounded stack>
                      <q-item-section>
                        <q-item-label class="text-h6 text-weight-bold blue">T<span class="text-lowercase">reno</span></q-item-label>
                      </q-item-section>
                    </q-btn>
                  </q-item>
                  <q-item>
                    <q-btn class="btn gray1" size="2.5em" icon="mdi-account-group" rounded stack>
                      <q-item-section>
                        <q-item-label class="text-h6 text-weight-bold blue">S<span class="text-lowercase">haring</span></q-item-label>
                      </q-item-section>
                    </q-btn>
                  </q-item>
                </q-list>
              </q-scroll-area>

              <q-item-label class="text-left text-h5 gray1 text-weight-bold" header>Plastic free</q-item-label>
              <q-scroll-area
                horizontal
                style="height: 150px; width: 100vw;"
                class="sfondo q-mb-md"
              >
                <q-list class="row no-wrap">
                  <q-item>
                    <q-btn class="btn gray1" size="2.5em" icon="mdi-bottle-soda-classic" rounded stack>
                      <q-item-section>
                        <q-item-label class="text-h6 text-weight-bold blue">B<span class="text-lowercase">evande</span></q-item-label>
                      </q-item-section>
                    </q-btn>
                  </q-item>
                  <q-item>
                    <q-btn class="btn gray1" size="2.5em" icon="mdi-food-apple" rounded stack>
                      <q-item-section>
                        <q-item-label class="text-h6 text-weight-bold blue">A<span class="text-lowercase">limentari</span></q-item-label>
                      </q-item-section>
                    </q-btn>
                  </q-item>
                  <q-item>
                    <q-btn class="btn gray1" size="2.5em" icon="mdi-purse" rounded stack>
                      <q-item-section>
                        <q-item-label class="text-h6 text-weight-bold blue">A<span class="text-lowercase">ccessori</span></q-item-label>
                      </q-item-section>
                    </q-btn>
                  </q-item>
                </q-list>
              </q-scroll-area>
            </q-list>
          </div>
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
  min-width: 30vw
  min-height: 14vh
  padding: 10px 0px
  background-color: white
</style>
