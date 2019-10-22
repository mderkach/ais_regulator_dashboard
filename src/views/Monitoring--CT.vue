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
      @click="mapClick($event)"
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
        :ref="'point' + point.id"
        :lat-lng="[point.latitude, point.longtitude]"
        @click="chooseNewPnt(point.id)"
      >
        <l-popup
          v-if="point.id == choosePntId"
          :options="{minWidth: '531px', closeButton: false, className: 'custom'}"
          @ready="popupReady(point.id)"
        >
          <c-tbubble
            :point="choosePnt"
            :is-change-mode="point.id != -2"
            @close="chooseNewPnt(-1)"
            @refresh="reloadPoints"
          />
        </l-popup>
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
    <map-sidebar
      :style="'max-height: 85vh; height: 100%; top: 50%; transform: translateY(-50%);'"
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
        <v-list-item-group
          v-else
          color="primary"
        >
          <div
            v-for="(point, i) in points"
            :key="i"
            class="ct-list-items-wrapper"
          >
            <v-list-item
              v-if="point.id != -2"
              @click="chooseNewPnt(point.id)"
            >
              <v-list-item-content>
                <v-list-item-title v-text="`${point.name} (${point.direction_id ? 'Обратно' : 'Туда'})`" />
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-list-item-group>
      </v-list>
    </map-sidebar>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import axios from 'axios'
  import Controls from '../components/controls/Сontrols'
  import mapSidebar from '../components/sidebar/MapSidebar'
  import CTbubble from '../components/ct/CTbuble'

  export default {
    components: {
      Controls,
      mapSidebar,
      CTbubble,
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
      setTimeout(
        this.reloadPoints, 100)
    },
    methods: {
      zoomUpdated (zoom) {
        this.zoom = zoom
      },
      chooseNewPnt (id) {
        if (id !== this.choosePntId) {
          if (id === -1) {
            this.$refs['point' + this.choosePntId][0].mapObject.closePopup()
            setTimeout(() => {
              this.showPntCircle = false
              this.choosePntId = id
            }, 150)
          } else {
            this.showPntCircle = true
            if (this.choosePntId !== -1 && this.$refs['point' + this.choosePntId][0]) {
              this.$refs['point' + this.choosePntId][0].mapObject.closePopup()
            }
            this.choosePntId = id
            let pnt = this.pointById(id)
            pnt.direction = pnt.direction_id === 1 ? 'Обратное' : 'Прямое'
            pnt.type = pnt.type === 0 ? 'Остановка' : 'Участок дороги'
            this.choosePnt = pnt
          }
        } else if (id === -2) {
          console.log('awdawd')
          this.$refs['point' + id][0].mapObject.openPopup()
        }
      },
      popupReady (id) {
        this.$refs['point' + id][0].mapObject.openPopup()
        setTimeout(() => {
          this.mapCenter = [this.choosePnt.latitude + 0.0017, this.choosePnt.longtitude - 0.0014]
          this.zoom = 17
        }, 10)
      },
      showNewCircle () {
        this.showPntCircle = true
      },
      mapClick (event) {
        let pnt = this.points.find(x => x.id === -2)
        pnt.latitude = event.latlng.lat
        pnt.longtitude = event.latlng.lng
        this.showNewCircle()
        this.chooseNewPnt(-2)
      },
      centerUpdated (center) {
        this.mapCenter = center
      },
      reloadPoints () {
        if (this.choosePntId !== -1 && this.$refs['point' + this.choosePntId][0]) {
          this.$refs['point' + this.choosePntId][0].mapObject.closePopup()
        }
        this.pointsLoad = true
        this.showPntCircle = false
        axios
          .get('http://194.58.104.20/GetControlPoints.php', {
            params: {
              sessionId: this.sessionID,
            },
          })
          .then(res => {
            this.pointsReady = true
            let arr = res.data[0].ControlPoints
            arr.push({
              name: '',
              type: '',
              direction: '',
              longtitude: -100,
              latitude: -100,
              radius: 0,
              address: '',
              id: -2,
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
</style>
