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
          @update:bounds="boundsUpdated"
        >
          <l-marker
            ref="myGeo"
            :lat-lng="marker"
          />

          <l-marker
            v-for="(point, i) in points"
            :key="i"
            :lat-lng="[point.latitude, point.longtitude]"
            :options="{title: `${point.name} (${point.direction_id ? 'Обратное' : 'Прямое'}) (${point.id})`}"
            @click="addPointToRoute(point)"
          >
            <l-icon
              :icon-anchor="pointMarkerAnchor"
            >
              <span
                v-if="choosenPath.straight.find(x => x.id === point.id)"
                :class="{
                  pointDir: true,
                  str: true,
                  sMain: choosenPath.straight.findIndex(x => x.id === point.id) ===
                    choosenPath.straight.length - 1}"
              >
                ПР
              </span>
              <span
                v-if="choosenPath.reverse.find(x => x.id === point.id)"
                :class="{
                  pointDir: true,
                  rvrs: true,
                  rMain: choosenPath.reverse.findIndex(x => x.id === point.id) ===
                    choosenPath.reverse.length - 1}"
              >
                ОБР
              </span>
              <img
                width="24"
                src="../assets/gps.svg"
                alt="marker"
              >
            </l-icon>
          </l-marker>
          <l-tile-layer :url="url" />
          <l-polyline
            :lat-lngs="straightPath"
            :color="'#07fc03'"
            :weight="6"
            @click="changeMode(1)"
          />
          <l-polyline
            :lat-lngs="reversePath"
            :color="'#ff0000'"
            :weight="6"
            @click="changeMode(2)"
          />
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
            :color="mode === 1 ? 'green' : mode === 2 ? 'red' : ''"
            nav
            dense
          >
            <v-subheader
              :dark="mode != 0"
            >
              Список контрольный точек
            </v-subheader>
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
                    @click="toPnt(point.id)"
                  >
                    <v-list-item-content>
                      <v-list-item-title v-text="`${point.name} (${point.direction_id ? 'Обратно' : 'Туда'}) (${point.id})`" />
                    </v-list-item-content>
                  </v-list-item>
                </div>
              </v-list-group>
            </v-list>
          </v-list>

          <v-list
            nav
            :color="mode === 1 ? 'green' : mode === 2 ? 'red' : ''"
          >
            <v-subheader
              :dark="mode != 0"
            >
              Список Маршрутов
            </v-subheader>
            <div
              v-if="pathLoad"
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
              <div class="newPathInput">
                <v-btn
                  outlined
                  @click=" toDefaultRoute(); showPicker = true"
                >
                  Добавить маршрут
                </v-btn>
              </div>
              <v-list-item
                v-for="(path, i) in paths"
                :key="i"
                @click="choosePath(path)"
              >
                <v-list-item-content>
                  <v-list-item-title
                    v-text="`${path.RouteInfo.name} (${geozones.find(x => x.id == path.RouteInfo.geozone_id) ? geozones.find(x => x.id == path.RouteInfo.geozone_id).name : 'Не указано'})`"
                  />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-list>
        </map-sidebar>
      </v-col>
      <v-col
        cols="3"
        lg="3"
        md="4"
        sm="4"
        class="map-sidebar-col-right"
      >
        <map-sidebar
          :style="'max-height: 85vh; top: 10px; position: absolute'"
          :right="true"
        >
          <route-picker
            v-if="showPicker"
            :route="choosenPath"
            @to-point="toPnt"
            @change-mode="changeMode"
            @cansel="toDefaultRoute"
            @refresh="reloadPaths(); toDefaultRoute()"
          />
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
  import routePicker from '../components/route/routePicker'

  export default {
    components: {
      Controls,
      mapSidebar,
      routePicker,
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
        geozones: [],
        filteredGeozones: [],
        choosenPath: {
          id: null,
          name: '',
          straight: [],
          reverse: [],
          color: 1,
          geozone_id: 0,
          operationalSpeed: null,
          transportType: 0,
        },
        paths: [],
        pathLoad: false,
        mode: 0,
        straightPath: [],
        reversePath: [],
        showPicker: false,
      }
    },
    computed: {
      ...mapGetters([
        'geolocation',
        'sessionID',
        'points',
        'pointById']),
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
          this.reloadPoints()
          this.reloadPaths()
        })
    },
    methods: {
      zoomUpdated (zoom) {
        this.zoom = zoom
      },
      centerUpdated (center) {
        this.mapCenter = center
      },
      boundsUpdated (bounds) {
        this.bounds = bounds
      },
      toPnt (id) {
        let pnt = this.points.find(x => x.id === id)
        this.zoomUpdated(20)
        this.centerUpdated([pnt.latitude, pnt.longtitude])
      },
      addPointToRoute (e) {
        let latlng = [e.latitude, e.longtitude]
        let point = {
          id: e.id,
          isCheckpoint: false,
        }
        if (this.choosenPath.straight.findIndex(x => x.id === point.id) ===
          this.choosenPath.straight.length - 1 && this.choosenPath.straight.length > 1) {
          this.changeMode(1)
        }
        if (this.choosenPath.reverse.findIndex(x => x.id === point.id) ===
          this.choosenPath.reverse.length - 1 && this.choosenPath.reverse.length > 1) {
          this.changeMode(2)
        }

        if (this.mode === 1) {
          if (this.choosenPath.straight.find(x => x.id === point.id) &&
            this.choosenPath.straight.findIndex(x => x.id === point.id) ===
            this.choosenPath.straight.length - 1) {
            this.straightPath.pop()
            this.choosenPath.straight.pop()
          } else if (!this.choosenPath.straight.find(x => x.id === point.id)) {
            this.straightPath.push(latlng)
            this.choosenPath.straight.push(point)
          }
        }
        if (this.mode === 2) {
          if (this.choosenPath.reverse.find(x => x.id === point.id) &&
            this.choosenPath.reverse.findIndex(x => x.id === point.id) ===
            this.choosenPath.reverse.length - 1) {
            this.reversePath.pop()
            this.choosenPath.reverse.pop()
          } else if (!this.choosenPath.reverse.find(x => x.id === point.id)) {
            this.reversePath.push(latlng)
            this.choosenPath.reverse.push(point)
          }
        }
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
              el.geozone = this.geozones.find(x => parseInt(x.id, 10) === el.geozone_id)
                ? this.geozones.find(x => parseInt(x.id, 10) === el.geozone_id).name
                : 'Не задано'
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
      reloadPaths (id) {
        return new Promise((resolve, reject) => {
          axios
            .get('http://194.58.104.20/GetRoutes.php', {
              params: {
                sessionId: this.sessionID,
              },
            })
            .then(res => {
              this.paths = res.data
              let path = null
              if (id) {
                path = res.data.find(x => x.RouteInfo.id === id)
              }
              resolve(path)
            })
        })
      },
      changeMode (newMode) {
        this.mode = newMode
      },
      toDefaultRoute () {
        this.mode = 0
        this.showPicker = false
        this.choosenPath = {
          id: null,
          name: '',
          straight: [],
          reverse: [],
          color: 1,
          geozone_id: 0,
          operationalSpeed: null,
          transportType: 0,
        }
        this.straightPath = []
        this.reversePath = []
      },
      choosePath (path) {
        this.straightPath = []
        this.reversePath = []
        let newPath = Object.assign({}, path.RouteInfo)
        newPath.straight = path.StraightDirection
        newPath.reverse = path.ReverseDirection
        // eslint-disable-next-line eqeqeq
        newPath.geozone = this.geozones.find(x => x.id == path.RouteInfo.geozone_id) ? this.geozones.find(x => x.id == path.RouteInfo.geozone_id).name : 'Не указано'
        newPath.straight.forEach(pnt => {
          let point = this.points.find(x => x.id === pnt.id)
          this.straightPath.push([point.latitude, point.longtitude])
        })
        newPath.reverse.forEach(pnt => {
          let point = this.points.find(x => x.id === pnt.id)
          this.reversePath.push([point.latitude, point.longtitude])
        })
        this.choosenPath = newPath
        this.showPicker = true
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
  .newPathInput {
    display: flex;
    margin-bottom: 10px;

    .v-btn {
      margin: auto;
    }
  }
  .pointDir {
    padding: 2px 5px;
    background: #424242;
    color:white;
    border-radius: 3px;
    position: absolute;
  }

  .str {
    top: 1px;
    left: -1px;
  }
  .rvrs {
    top: 1px;
    left: -4px;
  }

  .sMain {
    background: #07fc03;
  }

  .rMain {
    background: #ff0000;
  }
</style>
