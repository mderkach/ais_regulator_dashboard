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
      <l-tile-layer :url="url" />
    </l-map>
    <controls />
    <sidebar :is-open="sb">
      <car-list
        class="sidebar-div"
        @choose-track="opt = !opt"
      />
    </sidebar>
    <sidebar
      :right="true"
      :is-open="opt"
    >
      <car-list
        class="sidebar-div"
      />
    </sidebar>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import Controls from '../components/controls/Сontrols'
  import CarList from '../components/map/car/CarList'
  import Sidebar from '../components/map/sidebar/MapSidebar'
  import axios from 'axios'

  export default {
    components: {
      Controls,
      Sidebar,
      CarList,
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
        interval: null,
        opt: false,
        sb: false,
      }
    },
    computed: {
      ...mapGetters(['geolocation', 'cars', 'sessionID', 'carsGeo', 'carMapCenter']),
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
          // this.interval = setInterval(this.getLastCoords, 1000)
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
    },
    methods: {
      zoomUpdated (zoom) {
        this.zoom = zoom
      },
      chooseTrack () {
        console.log('awdaw')
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
      ...mapMutations(['setNewCarMapCenter']),
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
