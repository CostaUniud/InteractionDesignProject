<template>
  <div v-if="!getScan" class="column">
    <!-- Foto profilo -->
    <div class="flex bg-green justify-center trasparente" style="height: 20vh">
      <q-btn v-if="!getFotoProfilo" :ripple="false" round color="blue" size="40px" @click="fotoDialog = true" style="margin-top: 12vh">
        <q-icon name="mdi-account-box"/>
      </q-btn>
      <q-avatar v-else class="shadow" size="120px" style="margin-top: 12vh;" @click="fotoDialog = true">
        <img :src="'data:image/png;base64,' + getFotoProfilo">
      </q-avatar>
    </div>

    <div class="col-auto q-mt-xl trasparente">
      <q-list class="q-gutter-xs row">
        <q-item style="width: 100vw">
          <!-- Nome profilo -->
          <q-item-section>
            <q-item-label class="text-green text-left text-weight-bold spezza" style="font-size: 1.9em">{{ getNome() ? getNome() : 'Francesco' }}</q-item-label>
          </q-item-section>
          <!-- Coin -->
          <q-item-section>
            <q-item-label class="text-yellow text-right text-weight-bold" style="font-size: 1.9em">{{ !getCoin() ? 0 : Math.round(getCoin() * 100) /100 }}</q-item-label>
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
            <q-btn rounded class="qr bg-white gray text-h5 border-radius" @click="qrCode()">
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
                  <q-item-label class="text-green text-weight-bolder" style="font-size: 1.2em">{{ !getDistanzaPercorsa() ? 0 : (Math.round(getDistanzaPercorsa() * 120)) }} g</q-item-label>
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
                <q-item-label class="text-green text-weight-bold text-center" style="font-size: 2em">{{ !getDistanzaPercorsa() ? 0 : Math.round(getDistanzaPercorsa() * 100) / 100 }} km</q-item-label>
              </q-card-section>
            </q-card>
          </q-item-section>
        </q-item>
        <q-item style="width: 100vw">
          <!-- Grafico coin -->
          <q-item-section>
            <q-card class="border-radius" style="width: 60vw">
              <q-card-section class="q-pb-none">
                <q-item-label class="gray1 text-h5 text-weight-light" style="font-size: 1.3em">VYcoin guadagnati</q-item-label>
              </q-card-section>
              <q-card-section class="q-pt-none">
                <Coin/>
              </q-card-section>
            </q-card>
          </q-item-section>
          <!-- Btn NFC -->
          <q-item-section side>
            <q-card class="border-radius q-pa-md q-mb-sm">
              <q-btn stack flat dense round color="blue" icon="mdi-cellphone-nfc" @click="nfcRead()" style="height: 80px; width: 20vw">
                <q-item-label class="q-mt-xs gray1">Lettura <br>nfc</q-item-label>
              </q-btn>
            </q-card>
            <q-card class="border-radius q-pa-md q-mt-sm">
              <q-btn stack flat dense round color="red" icon="mdi-cellphone-nfc" @click="nfcDialog = true" style="height: 80px; width: 20vw">
                <q-item-label class="q-mt-xs gray1">Scrittura <br>nfc</q-item-label>
              </q-btn>
            </q-card>
          </q-item-section>
        </q-item>
        <!-- Logout -->
        <q-item style="width: 100vw">
          <q-item-section>
            <q-card class="border-radius q-pa-md">
              <q-btn flat dense round class="gray1" label="Logout" icon="logout" @click="myLogout()" style="width: 80vw"/>
            </q-card>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <!-- Dialog scelta foto -->
    <q-dialog v-model="fotoDialog">
      <q-card style="width: 250px; border-radius: 20px">
        <q-card-actions>
          <q-item>
            <q-item-section style="width: 100px">
              <q-file style="height: 0px" borderless v-model="foto" @input="filesSelected" multiple accept=".jpg, image/*" max-files="1">
                <template v-slot:prepend>
                  <q-icon color="yellow" name="mdi-image-plus" @click.stop size="55px"/>
                </template>
              </q-file>
            </q-item-section>
            <q-item-section style="width: 100px">
              <q-btn color="red" flat rounded icon="mdi-camera" size="35px" :ripple="false" @click="takePhoto()"/>
            </q-item-section>
          </q-item>
          <q-item class="q-pt-none">
            <q-item-label class="text-center gray1 text-body1 text-weight-bold">Scegli una foto o scattane una!</q-item-label>
          </q-item>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- Dialog scrittura nfc -->
    <q-dialog v-model="nfcDialog">
      <q-card style="width: 250px; border-radius: 20px">
        <q-card-section>
          <q-item>
            <q-input filled v-model="text"/>
          </q-item>
          <q-item>
            <q-item-section>
              <q-btn color="red" label="Scrivi NFC" @click="scriviNfc()"/>
            </q-item-section>
          </q-item>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { getCameraImage, logout, stopWatchPosition, getNome, getCoin, getDistanzaPercorsa, arrayBufferToBase64, getFoto, setFoto, nfcRead, nfcWrite } from '@/utils/bt.js'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Coin from '@/components/charts/Coin'

export default {
  data () {
    return {
      foto: null,
      fotoDialog: false,
      nfcDialog: false,
      text: ''
    }
  },
  components: {
    Coin
  },
  mounted () {
    this.setTab('profilo')
    this.setFotoProfilo(getFoto())
  },
  computed: {
    ...mapGetters({
      'getWatchID': 'conf/getWatchID',
      'getFotoProfilo': 'conf/getFotoProfilo',
      'getScan': 'conf/getScan'
    })
  },
  methods: {
    ...mapMutations({
      'setTab': 'conf/setTab',
      'setFotoProfilo': 'conf/setFotoProfilo',
      'setScan': 'conf/setScan',
      'dialog': 'conf/dialog'
    }),
    ...mapActions({
      'cancellaAzioni': 'azioni/cancellaAzioni'
    }),
    getNome,
    getCoin,
    getDistanzaPercorsa,
    getFoto,
    nfcRead,
    async filesSelected () {
      this.card = false
      let file = await this.readFile(this.foto[0])
      let imgScr = await arrayBufferToBase64(file)
      this.setFotoProfilo(imgScr)
      setFoto(imgScr)
      this.foto = null
    },
    readFile (file) {
      let reader = new FileReader()

      return new Promise((resolve, reject) => {
        reader.onload = () => {
          resolve(reader.result)
        }
        reader.readAsArrayBuffer(file)
      })
    },
    async takePhoto () {
      await getCameraImage()
        .then(res => {
          this.setFotoProfilo(res)
          setFoto(res)
          this.card = false
        })
        .catch(error => {
          console.log('getCameraImage > error', error)
        })
    },
    async qrCode () {
      await this.scanQR()
        .then(res => {
          window.QRScanner.destroy()

          this.setScan(false)

          this.$store.commit('conf/dialog', {
            visible: true,
            icon: 'mdi-qrcode-scan',
            color: 'blue',
            textColor: 'white',
            class: 'text-body1 gray1',
            label: 'Scannerrizzazione riuscita! Ecco il tuo risultato: ' + res,
            actions: [
              {
                label: 'Chiudi',
                color: 'green',
                action: () => {
                  this.$store.commit('conf/dialog', {})
                }
              }
            ]
          })
        })
        .catch(error => {
          console.log('scanQR', error)
        })
    },
    async scanQR () {
      this.setScan(true)
      window.QRScanner.show()
      return new Promise((resolve, reject) => {
        window.QRScanner.scan(
          async function displayContents (err, text) {
            if (err) {
              reject(err)
            } else {
              resolve(text)
            }
          })
      })
    },
    async scriviNfc () {
      this.nfcDialog = false
      await nfcWrite(this.text)
        .then(res => {
          this.text = ''
        })
        .catch(error => {
          console.log('scriviNfc > error', error)
        })
    },
    myLogout () {
      stopWatchPosition(this.getWatchID)
      this.setFotoProfilo(null)
      logout()
      this.cancellaAzioni()
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
.q-file
  position: relative
  bottom: 47px
  left: 20px
.shadow
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2)
</style>
