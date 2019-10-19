<template>
  <div class="map">
    <l-map
      ref="osm"
      style="height: calc(100vh - 88px); width: 100%"
      :zoom="zoom"
      :center="initialLocation"
      :options="{ zoomControl: false }"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
    >
      <l-marker
        ref="myGeo"
        :lat-lng="marker"
      />
      <l-tile-layer :url="url" />
    </l-map>
    <controls />
    <c-tbubble />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Controls from '../components/controls/Сontrols'
  import CTbubble from '../components/map/ct/CTbuble'

  export default {
    components: {
      Controls,
      CTbubble,
    },
    data () {
      return {
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        initialLocation: [45.044502, 41.969065],
        marker: [-100, -100],
        zoom: 13,
      }
    },
    computed: {
      ...mapGetters(['geolocation']),
    },
    watch: {
      geolocation (newGeo, oldGeo) {
        if (newGeo !== this.initialLocation) {
          this.marker = this.$store.state.geolocation
          this.initialLocation = this.$store.state.geolocation
        }
      },
    },
    methods: {
      zoomUpdated (zoom) {
        this.zoom = zoom
      },
      centerUpdated (center) {
        this.initialLocation = center
      },
    },
  }
</script>
