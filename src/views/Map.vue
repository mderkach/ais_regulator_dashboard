<template>
  <div class="map">
    <l-map
      ref="osm"
      style="height: calc(100vh - 75px); width: 100%"
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
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Controls from '../components/controls/Сontrols'

  export default {
    components: {
      Controls,
    },
    data: () => ({
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      initialLocation: [45.044502, 41.969065],
      marker: [-100, -100],
      zoom: 13,
    }),
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
