<template>
  <div>
    <div id="map"></div>

    <q-btn round class="btn layer green bg-white" icon="mdi-layers-outline" @click="menuOpen = !menuOpen"/>
    <div v-if="menuOpen" class="menu">
      <q-list>
        <q-item class="menu-item" style="margin-top: 15px">
          <q-item-section>
            <q-btn flat round :class="airLayerActive ? 'bg-blue' : 'bg-gray1'" class="btn-menu" color="white" icon="mdi-weather-windy" @click="airLayerActive = !airLayerActive"/>
          </q-item-section>
        </q-item>
        <q-item class="menu-item">
          <q-item-section>
            <q-btn flat round :class="greenLayerActive ? 'bg-green' : 'bg-gray1'" class="btn-menu" color="white" icon="mdi-tree" @click="greenLayerActive = !greenLayerActive"/>
          </q-item-section>
        </q-item>
        <q-item class="menu-item">
          <q-item-section>
            <q-btn flat round :class="energyLayerActive ? 'bg-red' : 'bg-gray1'" class="btn-menu" color="white" icon="mdi-flash" @click="energyLayerActive = !energyLayerActive"/>
          </q-item-section>
        </q-item>
        <q-item class="menu-item">
          <q-item-section>
            <q-btn flat round :class="ecoLayerActive ? 'bg-yellow' : 'bg-gray1'" class="btn-menu" color="white" icon="mdi-recycle" @click="ecoLayerActive = !ecoLayerActive"/>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <q-btn round class="btn me green bg-white" icon="mdi-crosshairs-gps" @click="centerMe()"/>
    <q-btn round class="btn home green bg-white" icon="mdi-city-variant-outline" @click="centerHome()"/>
  </div>
</template>

<script>
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import { mapGetters } from 'vuex'
import { getCurrentPosition } from '@/utils/bt.js'

export default {
  name: 'MappaOl',
  data () {
    return {
      map: {},
      zoom: 14.5,
      center: [12.655040, 45.962650],
      pn: [12.66, 45.955],
      rotation: 0,
      menuOpen: false,
      airLayerActive: true,
      greenLayerActive: false,
      energyLayerActive: false,
      ecoLayerActive: false
    }
  },
  mounted () {
    this.initMap()
  },
  computed: {
    ...mapGetters({
      'datiAria': 'aria/getAria'
    })
  },
  methods: {
    initMap () {
      this.map = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new XYZ({
              url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
          })
        ],
        view: new View({
          projection: 'EPSG:4326',
          center: this.center,
          zoom: this.zoom
        })
      })
    },
    centerHome () {
      var newView = new View({
        projection: 'EPSG:4326',
        center: this.pn,
        zoom: 14.5
      })
      this.map.setView(newView)
    },
    async centerMe () {
      this.$q.loading.show({ message: 'Rilevando posizione...' })

      // var iconStyle = new Style({
      //   image: new Icon({
      //     anchor: [0.5, 46],
      //     anchorXUnits: 'fraction',
      //     anchorYUnits: 'pixels',
      //     src: '@/assets/marker.png'
      //   })
      // })

      // iconFeature.setStyle(iconStyle)

      await getCurrentPosition()
        .then(res => {
          this.$q.loading.hide()
          var newView = new View({
            projection: 'EPSG:4326',
            center: [res.coords.longitude, res.coords.latitude],
            zoom: 14.5
          })
          this.map.setView(newView)
        })
        .catch(error => {
          console.log('getCurrentPosition > error', error)
        })
    },
    livelloAria () {
      let colore
      if (this.datiAria > 90) {
        colore = 'rgba(255, 126, 219, 0.3)'
      } else {
        colore = 'rgba(43, 143, 219, 0.3)'
      }
      return colore
    }
  }
}
</script>

<style lang="sass" scoped>
#map
  height: 80vh
.btn
  width: 60px
  height: 60px
  right: 20px
  position: absolute
  z-index: 100
.layer
  bottom: 180px
.me
  bottom: 105px
.home
  bottom: 30px
.menu
  z-index: 10
  background-color: white
  min-width: 60px
  border-top-right-radius: 40px
  border-top-left-radius: 40px
  right: 20px
  bottom: 200px
  position: absolute
  height: 300px
  box-shadow: 0px 20px 20px -10px rgba(0,0,0,0.5)
.btn-menu
  width: 45px
  height: 45px
.menu-item
  padding: 7px 7px
</style>
