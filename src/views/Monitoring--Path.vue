<template>
  <v-container
    fluid
    style="padding: 0"
  >
    <v-row>
      <v-col
        cols="12"
        style="padding: 0"
      >
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
          <l-circle
            v-if="showPntCircle"
            :lat-lng="[choosePnt.latitude,choosePnt.longtitude]"
            :radius="choosePnt.radius ? parseInt(choosePnt.radius, 10) : 0"
            :color="'red'"
          />

          <l-marker
            v-for="(point, i) in points"
            :key="i"
            :lat-lng="[point.latitude, point.longtitude]"
            :options="{title: `${point.name} (${point.direction_id ? 'Обратное' : 'Прямое'})`}"
          >
            <l-icon
              :icon-anchor="pointMarkerAnchor"
            >
              <img
                width="24"
                src="../assets/gps.svg"
                alt="marker"
              >
            </l-icon>
          </l-marker>
          <l-tile-layer :url="url" />
        </l-map>
        <controls />
      </v-col>
      <v-col
        cols="3"
        lg="3"
        md="5"
        sm="4"
        class="map-sidebar-col-left"
      >
        <map-sidebar
          :style="'max-height: 85vh; top: 10px; position: absolute'"
        >
          <v-list
            v-if="pointsReady"
            nav
          >
            <v-subheader>Список контрольный точек</v-subheader>
            <div
              v-if="pointsLoad"
              class="loadingPoints"
              style="display: flex"
            >
              <v-progress-circular
                indeterminate
                color="primary"
                style="margin: auto"
              />
            </div>
            <v-list
              v-else
              color="white"
            >
              <v-list-group
                v-for="(geozone, i) in filteredGeozones"
                :key="i"
                no-action
                color="primary"
                prepend-icon="mdi-grain"
              >
                <template v-slot:activator>
                  <v-list-item-title>{{ geozone.name }}</v-list-item-title>
                </template>
                <div
                  v-for="(point, j) in points.filter(p => p.geozone_id === geozone.id)"
                  :key="j"
                  class="ct-list-items-wrapper"
                >
                  <v-list-item
                    v-if="point.id != -2"
                    @click="toPnt(point)"
                  >
                    <v-list-item-content>
                      <v-list-item-title v-text="`${point.name} (${point.direction_id ? 'Обратно' : 'Туда'})`" />
                    </v-list-item-content>
                  </v-list-item>
                </div>
              </v-list-group>
            </v-list>
          </v-list>
        </map-sidebar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import axios from 'axios'
  import Controls from '../components/controls/Сontrols'
  import mapSidebar from '../components/sidebar/MapSidebar'

  export default {
    components: {
      Controls,
      mapSidebar,
    },
    data () {
      return {
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        mapCenter: [45.044502, 41.969065],
        marker: [-100, -100],
        zoom: 13,
        pointsReady: false,
        pointsLoad: false,
        pointMarkerAnchor: [12, 12],
        choosePntId: -1,
        choosePnt: {},
        showPntCircle: false,
        geozones: [],
        filteredGeozones: [],
      }
    },
    computed: {
      ...mapGetters(['geolocation', 'sessionID', 'points', 'pointById']),
    },
    watch: {
      geolocation (newGeo, oldGeo) {
        if (newGeo !== this.initialLocation) {
          this.marker = this.$store.state.geolocation
          this.initialLocation = this.$store.state.geolocation
        }
      },
    },
    created: function () {
      axios
        .get('http://194.58.104.20/GetGeozones.php')
        .then(res => {
          this.geozones = res.data
        }).then(() => {
          this.geozones.push({ name: 'Не задано', id: '0' })
        })
      setTimeout(
        this.reloadPoints, 100)
    },
    methods: {
      zoomUpdated (zoom) {
        this.zoom = zoom
      },
      centerUpdated (center) {
        this.mapCenter = center
      },
      toPnt (pnt) {
        this.zoomUpdated(15)
        this.centerUpdated([pnt.latitude, pnt.longtitude])
      },
      reloadPoints () {
        this.pointsLoad = true
        axios
          .get('http://194.58.104.20/GetControlPoints.php', {
            params: {
              sessionId: this.sessionID,
            },
          })
          .then(res => {
            this.pointsReady = true
            let arr = res.data[0].ControlPoints
            arr.forEach(el => {
              el.geozone = this.geozones.find(x => parseInt(x.id, 10) === el.geozone_id).name
              if (!this.filteredGeozones.find(x => x.id === el.geozone_id)) {
                this.filteredGeozones.push({ name: el.geozone, id: el.geozone_id })
              }
              this.filteredGeozones.sort((a, b) => {
                if (a.id > b.id) {
                  return -1
                } else if (a.id < b.id) {
                  return 1
                } else {
                  return 0
                }
              })
            })
            this.setPointsArray(arr)
            this.pointsLoad = false
          })
      },
      ...mapMutations([
        'setPointsArray']),
    },
  }
</script>

<style lang="scss">
  .leaflet-popup-content {
    width: 600px;
  }
  .custom .leaflet-popup-tip,
  .custom .leaflet-popup-content-wrapper {
    background-color: #424242;
  }
  .custom .leaflet-popup-content-wrapper .leaflet-popup-content {
    margin: 0;
  }
  .map {
    position: relative;
  }
</style>
