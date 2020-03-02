<template>
  <div>
    <div>
      <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" data-projection="EPSG:4326" style="width: 170vw; height: 79.7vh" class="sfondo">
        <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

        <vl-geoloc @update:position="geolocPosition = $event">
          <template slot-scope="geoloc">
            <vl-feature v-if="geoloc.position" id="position-feature">
              <vl-geom-point :coordinates="geoloc.position"></vl-geom-point>
              <vl-style-box>
                <vl-style-icon src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png" :scale="0.1" :anchor="[0.5, 1]"></vl-style-icon>
              </vl-style-box>
              <!-- <vl-style-box>
                <vl-style-circle :radius="20" :scale="0.1" :anchor="[0.5, 1]">
                  <vl-style-fill color="rgba(102, 0, 102, 0.5)"></vl-style-fill>
                </vl-style-circle>
              </vl-style-box> -->
            </vl-feature>
          </template>
        </vl-geoloc>

        <vl-layer-tile id="osm">
          <vl-source-osm></vl-source-osm>
        </vl-layer-tile>
      </vl-map>
    </div>
    <div id="map" class="map"></div>

    <q-btn round class="btn me green bg-white" icon="mdi-crosshairs-gps" @click="centerMe()"/>
    <q-btn round class="btn home green bg-white" icon="mdi-city-variant-outline" @click="centerHome()"/>
    <q-btn round class="btn layer green bg-white" icon="mdi-layers-outline" @click="openLayer()"/>
  </div>
</template>

<script>
export default {
  name: 'Mappa',
  data () {
    return {
      message: null,
      zoom: 14.624,
      center: [12.668, 45.955],
      rotation: 0,
      geolocPosition: null
    }
  },
  methods: {
    centerHome () {
      this.center = [12.668, 45.955]
      this.zoom = 14.624
      this.rotation = 0
    },
    centerMe () {
      this.center = this.geolocPosition
      this.zoom = 14
      this.rotation = 0
    },
    openLayer () {
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
.me
  bottom: 30px
.home
  bottom: 105px
.layer
  bottom: 180px
</style>
