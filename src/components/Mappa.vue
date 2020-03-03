<template>
  <div>
    <div>
      <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" data-projection="EPSG:4326" style="width: 170vw; height: 79.7vh" class="sfondo">
        <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

        <vl-geoloc @update:position="evento($event)">
          <template slot-scope="geoloc">
            <vl-feature v-if="geoloc.position" id="position-feature">
              <vl-geom-point :coordinates="geoloc.position"></vl-geom-point>
              <vl-style-box>
                <vl-style-icon src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png" :scale="0.1" :anchor="[0.5, 1]"></vl-style-icon>
              </vl-style-box>
            </vl-feature>
          </template>
        </vl-geoloc>

        <vl-layer-vector>
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

    <q-btn round class="btn layer green bg-white" icon="mdi-layers-outline" @click="openLayer()"/>
    <div v-if="menuOpen" class="menu">
      <q-list>
        <q-item class="menu-item" style="margin-top: 15px">
          <q-item-section>
            <q-btn flat round class="btn-menu bg-blue" color="white" icon="mdi-weather-windy" @click="openLayer()"/>
          </q-item-section>
        </q-item>
        <q-item class="menu-item">
          <q-item-section>
            <q-btn flat round class="btn-menu bg-green" color="white" icon="mdi-tree" @click="openLayer()"/>
          </q-item-section>
        </q-item>
        <q-item class="menu-item">
          <q-item-section>
            <q-btn flat round class="btn-menu bg-red" color="white" icon="mdi-flash" @click="openLayer()"/>
          </q-item-section>
        </q-item>
        <q-item class="menu-item">
          <q-item-section>
            <q-btn flat round class="btn-menu bg-yellow" color="white" icon="mdi-recycle" @click="openLayer()"/>
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

export default {
  name: 'Mappa',
  data () {
    return {
      zoom: 14.624,
      center: [12.668, 45.955],
      rotation: 0,
      geolocPosition: null,
      click: false,
      pn: [12.66, 45.955],
      menuOpen: false
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
      this.click = true

      await this.$on('coord', function performePosition () {
        this.$q.loading.hide()
        this.center = [this.geolocPosition[0] + 0.012, this.geolocPosition[1]]
        this.zoom = 14
        this.rotation = 0
        this.click = false
      })
    },
    openLayer () {
      this.menuOpen = !this.menuOpen
    },
    evento (event) {
      this.geolocPosition = event
      if (this.click) {
        this.$emit('coord')
      }
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
