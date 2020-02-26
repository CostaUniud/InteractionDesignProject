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

    <q-btn round class="btn-map" color="green" icon="gps_not_fixed" @click="centerMap"/>
  </div>
</template>

<script>
export default {
  name: 'Mappa',
  data () {
    return {
      message: null,
      zoom: 13,
      center: [12.68, 45.95],
      rotation: 0,
      geolocPosition: null
    }
  },
  methods: {
    centerMap () {
      this.center = [12.68, 45.95]
      this.zoom = 13
      this.rotation = 0
    }
  }
}
</script>

<style lang="sass" scoped>
.btn-map
  width: 50px
  height: 50px
  bottom: 30px
  right: 30px
  position: absolute
</style>
