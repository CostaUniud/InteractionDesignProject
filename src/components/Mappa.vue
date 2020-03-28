<template>
  <div>
    <div>
      <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" data-projection="EPSG:4326" style="height: 79.5vh" class="sfondo">
        <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

        <vl-geoloc @update:position="geolocPosition = $event">
          <template slot-scope="geoloc">
            <vl-feature v-if="geoloc.position" id="position-feature">
              <vl-geom-point :coordinates="geoloc.position"></vl-geom-point>
              <vl-style-box>
                <vl-style-icon :src="marker" :scale="0.3" :anchor="[0.5, 1]"></vl-style-icon>
              </vl-style-box>
            </vl-feature>
          </template>
        </vl-geoloc>

        <vl-layer-vector v-if="airLayerActive">
          <vl-feature>
            <vl-geom-point :coordinates="pn"></vl-geom-point>

            <vl-style-box>
              <vl-style-circle :radius="40">
                <vl-style-fill :color="livelloAria()"></vl-style-fill>
              </vl-style-circle>
            </vl-style-box>
          </vl-feature>
        </vl-layer-vector>

        <vl-layer-tile id="osm">
          <vl-source-osm></vl-source-osm>
        </vl-layer-tile>
      </vl-map>
    </div>
    <div id="map" class="map"></div>

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
import { mapGetters } from 'vuex'
import marker from '@/assets/marker.png'
import { getCurrentPosition } from '@/utils/bt.js'

export default {
  name: 'Mappa',
  data () {
    return {
      zoom: 14.624,
      center: [12.668, 45.955],
      rotation: 0,
      geolocPosition: null,
      pn: [12.668, 45.955],
      menuOpen: false,
      airLayerActive: true,
      greenLayerActive: false,
      energyLayerActive: false,
      ecoLayerActive: false,
      marker
    }
  },
  computed: {
    ...mapGetters({
      'datiAria': 'aria/getAria'
    })
  },
  methods: {
    centerHome () {
      this.center = [12.668, 45.955]
      this.zoom = 14.624
      this.rotation = 0
    },
    async centerMe () {
      this.$q.loading.show({ message: 'Rilevando posizione...' })

      await getCurrentPosition()
        .then(res => {
          this.$q.loading.hide()
          this.center = [res.coords.longitude, res.coords.latitude]
          this.zoom = 14
          this.rotation = 0
        })
        .catch(error => {
          console.log('getCurrentPosition > error', error)
        })
    },
    livelloAria () {
      let colore
      console.log(this.datiAria)
      if (this.datiAria > 80) {
        colore = 'rgba(255, 126, 219, 0.3)'
      } else if (this.datiAria > 60) {
        colore = 'rgba(242, 201, 76, 0.3)'
      } else {
        colore = 'rgba(43, 143, 219, 0.3)'
      }

      return colore
    }
  }
}
</script>

<style lang="sass" scoped>
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
