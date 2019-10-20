<template>
  <div class="map">
    <l-map
      ref="osm"
      style="height: calc(100vh - 88px); width: 100%"
      :zoom="zoom"
      :center="carMapCenter"
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
        :choose-car-mode="chooseCarMode"
        @choose-track="opt = !opt"
      />
    </sidebar>
    <sidebar
      :right="true"
    >
      <car-track-picker
        v-if="opt[0]"
      />
      <car-track-settings
        v-if="opt[1]"
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
        initialLocation: [45.044502, 41.969065],
        marker: [-100, -100],
        iconAnchor: [16, 16],
        iconMarkerAnchor: [18, 36],
        zoom: 13,
        carsMarkers: [],
        isCarsReady: false,
        interval: null,
        opt: [],
        sb: false,
        chooseCarMode: false,
      }
    },
    computed: {
      ...mapGetters([
        'geolocation',
        'cars',
        'sessionID',
        'carsGeo',
        'carMapCenter',
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
      sessionID: function () {
        axios
          .get('http://194.58.104.20/GetVehicles.php', {
            params: {
              sessionId: this.sessionID,
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
      chooseCarToTrack: function (newVal, oldVal) {
        if (newVal && !oldVal) {
          this.opt[0] = true
          this.chooseCarMode = true
        } else if (newVal == null) {
          this.opt[0] = false
          this.chooseCarMode = false
        }
      },
      chooseTrackToChange: function (newVal, oldVal) {
        if (newVal && !oldVal) {
          this.opt[1] = true
        } else if (newVal == null) {
          this.opt[1] = false
        }
      },
    },
    created: function () {
      axios
        .get('http://194.58.104.20/GetVehicles.php', {
          params: {
            sessionId: this.sessionID,
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
      this.sb = true
    },
    destroyed: function () {
      clearInterval(this.interval)
      this.chooseNewCarToTrack(null)
    },
    methods: {
      zoomUpdated (zoom) {
        this.zoom = zoom
      },
      centerUpdated (center) {
        this.setNewCarMapCenter(center)
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
