<template>
  <div class="sfondo column">
    <!-- Foto profilo -->
    <div class="flex bg-green justify-center" style="height: 20vh">
      <!-- <q-file v-if="!getFotoProfilo" @input="filesSelected" rounded outlined multiple accept=".jpg, image/*" v-model="foto" bg-color="white" max-files="1">
        <template v-slot:prepend>
          <q-icon name="mdi-image-plus" @click.stop />
        </template>
      </q-file> -->
      <q-btn v-if="!getFotoProfilo" :ripple="false" round color="blue" size="40px" @click="takePhoto()" style="margin-top: 12vh">
        <q-icon name="mdi-camera"/>
      </q-btn>
      <q-avatar v-else size="120px" style="margin-top: 12vh" @click="takePhoto()">
        <img :src="'data:image/png;base64,' + getFotoProfilo">
      </q-avatar>
    </div>

    <div class="col-auto q-mt-xl">
      <q-list class="q-gutter-xs row">
        <q-item style="width: 100vw">
          <!-- Nome profilo -->
          <q-item-section>
            <q-item-label class="text-green text-left text-weight-bold spezza" style="font-size: 1.9em">{{ getNome ? getNome : 'Francesco' }}</q-item-label>
          </q-item-section>
          <!-- Coin -->
          <q-item-section>
            <q-item-label class="text-yellow text-right text-weight-bold" style="font-size: 1.9em">{{ !getCoin ? 0 : Math.round(getCoin * 100) /100 }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <img src="@/assets/vycoin.png" style="height: 50px; max-width: 50px"/>
          </q-item-section>
        </q-item>
        <q-item style="width: 100vw">
          <!-- Wallet -->
          <q-item-section>
            <q-btn class="bg-green wallet" rounded @click="$router.push({ path: '/wallet' })">
              <q-item-section class="text-center">
                <q-item-label class="text-h4 text-weight-bold border-radius">W<span class="text-lowercase">allet</span></q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-icon size="3em" name="mdi-wallet-outline"/>
              </q-item-section>
            </q-btn>
          </q-item-section>
          <!-- QR Code -->
          <q-item-section side>
            <q-btn rounded class="qr bg-white gray text-h5 border-radius">
              <img src="@/assets/lettura_qr.svg" style="height: 40px">
            </q-btn>
          </q-item-section>
        </q-item>
        <q-item style="width: 100vw">
          <!-- Footprint -->
          <q-item-section>
            <q-card class="border-radius" style="height: 120px">
              <q-item>
                <q-item-section>
                  <q-item-label class="text-green text-h5 text-weight-light" style="font-size: 1.3em">My footprint</q-item-label>
                </q-item-section>
              </q-item>
              <q-card-section horizontal>
                <q-card-section class="q-pt-none">
                  <q-item-label class="text-green text-weight-bolder" style="font-size: 1.2em">1.6T</q-item-label>
                  <q-item-label class="text-green text-weight-bold" style="font-size: 1.2em">Good Job!</q-item-label>
                </q-card-section>
                <q-card-section class="q-pt-none">
                  <img src="@/assets/piede.svg" style="height: 50px"/>
                </q-card-section>
              </q-card-section>
            </q-card>
          </q-item-section>
          <!-- Passi -->
          <q-item-section>
            <q-card class="border-radius" style="height: 120px">
              <q-card-section>
                <q-item-label class="gray1 text-h5 text-weight-light" style="font-size: 1.3em">Km percorsi</q-item-label>
                <q-item-label class="text-green text-weight-bold text-center" style="font-size: 2em">{{ !getDistanzaPercorsa ? 0 : Math.round(getDistanzaPercorsa * 100) / 100 }} km</q-item-label>
              </q-card-section>
            </q-card>
          </q-item-section>
        </q-item>
        <!-- Grafico coin -->
        <q-item style="width: 100vw">
          <q-item-section>
            <q-card class="border-radius">
              <q-card-section class="q-pb-none">
                <q-item-label class="gray1 text-h5 text-weight-light" style="font-size: 1.3em">VYcoin guadagnati</q-item-label>
              </q-card-section>
              <q-card-section class="q-pt-none">
                <Coin/>
              </q-card-section>
            </q-card>
          </q-item-section>
        </q-item>
        <!-- Reset coin -->
        <!-- <q-item style="width: 100vw">
          <q-item-section>
            <q-card class="border-radius q-pa-md">
              <q-btn
                flat
                dense
                round
                text-color="black"
                label="Reset Coin"
                icon="reset"
                aria-label="Reset Coin"
                @click="resetCoin()"
                style="width: 80vw"
              />
            </q-card>
          </q-item-section>
        </q-item> -->
        <!-- Logout -->
        <q-item style="width: 100vw">
          <q-item-section>
            <q-card class="border-radius q-pa-md">
              <q-btn
                flat
                dense
                round
                class="gray1"
                label="Logout"
                icon="logout"
                aria-label="Esci"
                @click="myLogout()"
                style="width: 80vw"
              />
            </q-card>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Coin from '@/components/charts/Coin'
import { getCameraImage, logout, stopWatchPosition } from '@/utils/bt.js'

export default {
  data () {
    return {
      coin: 0
      // foto: null
    }
  },
  components: {
    Coin
  },
  mounted () {
    this.setTab('profilo')
  },
  computed: {
    ...mapGetters({
      'getWatchID': 'conf/getWatchID',
      'getDistanzaPercorsa': 'conf/getDistanzaPercorsa',
      'getFotoProfilo': 'conf/getFotoProfilo',
      'getCoin': 'conf/getCoin',
      'getNome': 'conf/getNome'
    })
  },
  methods: {
    ...mapMutations({
      'setTab': 'conf/setTab',
      'setCoin': 'conf/setCoin',
      'setNome': 'conf/setNome',
      'setFotoProfilo': 'conf/setFotoProfilo'
    }),
    // async filesSelected () {
    //   console.log(Uri.fromFile(new File('/' + this.foto[0].name)))
    //   const imgFileEntry = await getFileEntry(this.foto[0].name)
    //   const imgFile = await readFile(imgFileEntry)
    //   const imgScr = await arrayBufferToBase64(imgFile)
    //   this.setFotoProfilo(this.foto)
    // },
    async takePhoto () {
      await getCameraImage()
        .then(res => {
          this.setFotoProfilo(res)
        })
        .catch(error => {
          console.log('getCameraImage > error', error)
        })
    },
    myLogout () {
      stopWatchPosition(this.getWatchID)
      this.setFotoProfilo(null)
      this.setNome(null)
      this.setCoin(0)
      logout()
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style lang="sass" scoped>
.q-file
  width: 57px
  margin-top: 12vh
  height: 120px
.border-radius
  border-radius: 20px
.wallet
  height: 80px
  color: white
.qr
  height: 75px
</style>
