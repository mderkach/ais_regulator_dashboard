<template>
  <div class="map">
    <l-map
      ref="osm"
      style="height: calc(100vh - 88px); width: 100%"
      :zoom="zoom"
      :center="mapCenter"
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
            <span class="map-marker-text">{{ car.stateNumber }}</span>
            <img
              src="../assets/truck-front.png"
            >
          </l-icon>
        </l-marker>
      </div>
      <div v-if="mapTracks[0]">
        <l-feature-group
          v-for="(track, i) in mapTracks"
          :key="i"
        >
          <l-polyline
            :lat-lngs="track.latLngs"
            :color="track.color"
            :weight="track.weight"
            @click="chooseNewTrackToChange(track.trackId)"
          />
          <l-marker
            :lat-lng="track.latLngs[0]"
          >
            <l-icon
              :icon-anchor="iconMarkerAnchor"
            >
              <v-icon
                large
                color="green darken-2"
              >
                mdi-map-marker
              </v-icon>
            </l-icon>
          </l-marker>
          <l-marker
            :lat-lng="track.latLngs[track.latLngs.length - 1]"
          >
            <l-icon
              :icon-anchor="iconMarkerAnchor"
            >
              <v-icon
                large
                color="red darken-2"
              >
                mdi-map-marker
              </v-icon>
            </l-icon>
          </l-marker>
        </l-feature-group>
      </div>
      <l-tile-layer :url="url" />
    </l-map>
    <controls />
    <sidebar>
      <car-list
        v-if="isCarsReady"
        :cars="cars"
        :choose-car-mode="chooseCarToTrack != null"
        @chooseCar="centerUpdated"
      />
    </sidebar>
    <sidebar
      :right="true"
    >
      <car-track-picker
        v-if="chooseCarToTrack != null"
      />
      <car-track-settings
        v-if="chooseTrackToChange != null"
      />
    </sidebar>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import Controls from '../components/controls/Сontrols'
  import CarList from '../components/car/CarList'
  import CarTrackPicker from '../components/car/CarTrackPicker'
  import CarTrackSettings from '../components/car/CarTrackSettings'
  import Sidebar from '../components/sidebar/MapSidebar'
  import axios from 'axios'

  export default {
    components: {
      Controls,
      Sidebar,
      CarList,
      CarTrackPicker,
      CarTrackSettings,
    },
    data () {
      return {
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        marker: [-100, -100],
        iconAnchor: [16, 16],
        iconMarkerAnchor: [18, 36],
        mapCenter: [45.044502, 41.969065],
        zoom: 13,
        isCarsReady: false,
        interval: null,
        cars: [],
      }
    },
    computed: {
      ...mapGetters([
        'geolocation',
        'sessionID',
        'carsGeo',
        'chooseCarToTrack',
        'mapTracks',
        'chooseTrackToChange']),
    },
    watch: {
      geolocation (newGeo, oldGeo) {
        if (newGeo !== this.initialLocation) {
          this.marker = this.$store.state.geolocation
          this.initialLocation = this.$store.state.geolocation
        }
      },
      carsGeo: function (newVal, oldVal) {
        if (!this.isCarsReady) {
          this.isCarsReady = true
          this.interval = setInterval(this.getLastCoords, 1000)
        }
      },
    },
    created: function () {
      if (this.sessionId) {
        this.reloadCars()
      } else {
        setTimeout(
          this.reloadCars(), 100)
      }
    },
    destroyed: function () {
      clearInterval(this.interval)
      this.chooseNewCarToTrack(null)
    },
    methods: {
      zoomUpdated (zoom) {
        this.zoom = zoom
      },
      reloadCars () {
        axios
          .get('http://194.58.104.20/GetVehicles.php', {
            params: {
              sessionId: this.sessionID,
            },
          })
          .then(res => {
            let carsArr = res.data
            this.cars = carsArr
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
      centerUpdated (center) {
        this.mapCenter = center
      },
      getLastCoords () {
        axios
          .get('http://194.58.104.20/GetVehicleLastLocations.php', {
            params: {
              sessionId: this.sessionID,
            },
          })
          .then(res => {
            let carsGeoArr = []
            res.data.forEach(e => {
              carsGeoArr[e.vehicleId] = [e.latitude, e.longitude]
            })
            this.$store.commit('setCarsGeoArray', carsGeoArr)
          })
      },
      ...mapMutations([
        'setNewCarMapCenter',
        'chooseNewCarToTrack',
        'chooseNewTrackToChange']),
    },
  }
</script>

<style lang="scss">
  .map-marker-text {
    position: absolute;
    top: -20px;
    left: -16px;
    background: black;
    color: white;
    padding: 0 3px;
    border-radius: 5px;
  }
</style>
