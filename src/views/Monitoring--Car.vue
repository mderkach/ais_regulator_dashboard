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
      <div
        v-if="isCarsReady"
        class="marker-wrapper"
      >
        <l-marker
          v-for="(car, i) in cars"
          :key="i"
          :ref="car.vehicleId"
          :lat-lng="carsGeo[car.vehicleId]"
        >
          <l-icon
            :icon-anchor="iconAnchor"
          >
            <img
              src="../assets/truck-front.png"
            >
          </l-icon>
        </l-marker>
      </div>
      <l-tile-layer :url="url" />
    </l-map>
    <controls />
    <map-sidebar />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Controls from '../components/controls/Сontrols'
  import mapSidebar from '../components/map/car/MapCarSidebar'
  import axios from 'axios'

  export default {
    components: {
      Controls,
      mapSidebar,
    },
    data () {
      return {
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        initialLocation: [45.044502, 41.969065],
        marker: [-100, -100],
        iconAnchor: [16, 16],
        zoom: 13,
        carsMarkers: [],
        isCarsReady: false,
      }
    },
    computed: {
      ...mapGetters(['geolocation', 'cars', 'sessionID', 'carsGeo']),
    },
    watch: {
      geolocation (newGeo, oldGeo) {
        if (newGeo !== this.initialLocation) {
          this.marker = this.$store.state.geolocation
          this.initialLocation = this.$store.state.geolocation
        }
      },
      carsGeo: function (newVal, oldVal) {
        this.isCarsReady = true
        this.startTrackGeo()
      },
    },
    created: function () {
      axios
        .get('http://194.58.104.20/GetVehicles.php', {
          params: {
            sessionId: this.$store.state.sessionID,
          },
        })
        .then(res => {
          let cars = res.data
          this.$store.commit('setCarsArray', cars)
        }).then(() => {
          axios
            .get('http://194.58.104.20/GetVehicleLastLocations.php', {
              params: {
                sessionId: this.$store.state.sessionID,
              },
            })
            .then(res => {
              let carsGeoArr = []
              res.data.forEach(e => {
                carsGeoArr[e.vehicleId] = [e.latitude, e.longitude]
              })
              this.$store.commit('setCarsGeoArray', carsGeoArr)
            })
        })
    },
    mounted: function () {
      setInterval(() => {
        axios
          .get('http://194.58.104.20/GetVehicleLastLocations.php', {
            params: {
              sessionId: this.$store.state.sessionID,
            },
          })
          .then(res => {
            let carsGeoArr = []
            res.data.forEach(e => {
              carsGeoArr[e.vehicleId] = [e.latitude, e.longitude]
            })
            this.$store.commit('setCarsGeoArray', carsGeoArr)
          })
      }, 1000)
    },
    methods: {
      zoomUpdated (zoom) {
        this.zoom = zoom
      },
      centerUpdated (center) {
        this.initialLocation = center
      },
      startTrackGeo () {
      },
    },
  }
</script>
