<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="3"
      >
        <map-sidebar
          :class="'side-active classifiers-sidebar'"
        >
          <v-list
            nav
            dense
          >
            <v-toolbar flat>
              <v-toolbar-title>Список геозон</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <div class="newGeoInput">
              <v-text-field
                v-model="filterWord"
                label="Название геозоны"
                outlined
                @focus="showBtn = true"
              />
              <v-btn
                v-if="filterWord && !geozones.find(x => x.name === filterWord)"
                icon
                @click="createNewGeozone()"
              >
                <v-icon>mdi-plus-circle</v-icon>
              </v-btn>
            </div>
            <v-divider />
            <div
              v-if="geozonesLoad"
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
              ref="geosoneItems"
              color="primary"
            >
              <v-list-item
                v-for="(item, i) in filteredList"
                :key="i"
                @click="reviewZone(item)"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="item.name" />
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </map-sidebar>
      </v-col>
      <v-col>
        <material-card
          v-if="geozone.isShow"
          color="orange lighten-1"
          title="Геозона"
          :text="createZone === true ? 'Создание новой гeозоны' : 'Просмотр инормации о зоне'"
          flat
          full-width
          :offset="0"
        >
          <v-col cols="12">
            <v-text-field
              v-model="geozone.name"
              label="Имя"
              outlined
            />
          </v-col>
          <v-col
            cols="12"
            class="d-flex"
          >
            <v-select
              v-model="geozone.controlPoints.model"
              :items="geozone.controlPoints.items"
              chips
              small-chips
              label="Контрольные точки"
              multiple
              outlined
            />
          </v-col>
          <v-col
            cols="12"
            class="d-flex"
          >
            <v-select
              v-model="geozone.routes.model"
              :items="geozone.routes.items"
              chips
              small-chips
              label="Маршруты"
              multiple
              outlined
            />
          </v-col>
          <v-col
            cols="12"
            class="d-flex"
          >
            <v-select
              v-model="geozone.drivers.model"
              :items="geozone.drivers.items"
              chips
              small-chips
              label="Перевозчики"
              multiple
              outlined
            />
          </v-col>
          <v-divider />
          <v-col cols="12">
            <v-row>
              <v-col cols="4">
                <v-btn
                  block
                  @click="saveChanges"
                >
                  Сохранить
                </v-btn>
              </v-col>
              <v-col cols="4">
                <v-btn block>
                  Редактировать
                </v-btn>
              </v-col>
              <v-col cols="4">
                <v-btn
                  block
                  @click="deleteGeozone(geozone.id)"
                >
                  Удалить
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import mapSidebar from '../components/sidebar/MapSidebar'
  // eslint-disable-next-line
  import { mapState, mapGetters, mapMutations } from 'vuex'
  import axios from 'axios'
  // import { reject } from 'q'

  export default {
    name: 'Geozones',
    components: {
      mapSidebar,
    },
    data: vm => {
      return {
        newGeo: '',
        createZone: false,
        filterWord: '',
        showBtn: false,
        paths: [],
        filteredList: [],
        geozonesLoad: true,
      }
    },
    computed: {
      ...mapGetters(['geozones', 'points', 'sessionID', 'pointById']),
      ...mapState(['geozone', 'defaultGeozone']),
    },
    watch: {
      filterWord (val) {
        this.filteredList = this.geozones.filter(x => x.name.indexOf(this.filterWord, 0) !== -1)
      },
    },
    created: function () {
      this.refreshZones()
      this.reloadPaths()
    },
    destroyed: function () {
      this.reviewZone(null)
    },
    methods: {
      initializeZone () {
        this.geozone.isShow = true
        this.createZone = true
        // присвоить this.geozone geozoneTemplate из state и творить магию дальше
      },
      deleteGeozone (id) {
        axios
          .get('http://194.58.104.20/DeleteGeozone.php', {
            params: {
              id: id,
            },
          }).then((res) => {
            if (res.data[0].Result) {
              this.refreshZones().then(() => {
                this.reviewZone(null)
              })
            }
          })
      },
      refreshZones () {
        return new Promise((resolve, reject) => {
          this.geozonesLoad = true
          axios
            .get('http://194.58.104.20/GetGeozones.php')
            .then(res => {
              this.setNewGeoArr(res.data)
            }).then(() => {
              this.filteredList = this.geozones
              this.geozonesLoad = false
            }).then(() => {
              axios
                .get('http://194.58.104.20/GetControlPoints.php', {
                  params: {
                    sessionId: this.sessionID,
                  },
                })
                .then(res => {
                  this.setPointsArray(res.data[0].ControlPoints)
                  resolve()
                })
            })
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
              this.paths = res.data.map(x => {
                let newPath = Object.assign({}, x.RouteInfo)
                newPath.straight = x.StraightDirection
                newPath.reverse = x.ReverseDirection
                newPath.straight = JSON.stringify(newPath.straight)
                newPath.reverse = JSON.stringify(newPath.reverse)
                return newPath
              })
              let path = null
              if (id) {
                path = res.data.find(x => x.RouteInfo.id === id)
              }
              resolve(path)
            })
        })
      },
      createNewGeozone () {
        axios
          .get('http://194.58.104.20/SaveGeozone.php', {
            params: {
              name: this.filterWord,
            },
          }).then((res) => {
            if (res.data[0].Result) {
              this.refreshZones().then(() => {
                this.showBtn = false
                let name = this.filterWord
                this.reviewZone(this.geozones.find(zone => zone.name === name))
              })
            }
          })
      },
      saveChanges () {
        let arrCT = this.geozone.controlPoints.model
        if (arrCT[0].value) {
          arrCT = arrCT.map(x => x.value)
        }
        let itemsCT = this.geozone.controlPoints.items
        let arrPntToDeleteCT = itemsCT.filter(x => !arrCT.find(y => y === x)).map(x => x.value)
        arrPntToDeleteCT.forEach(el => {
          if (this.pointById(el).geozone_id === parseInt(this.geozone.id, 10)) {
            let par = Object.assign({}, this.pointById(el))
            par.geozone_id = 0
            par.sessionId = this.sessionID
            par.longitude = par.longtitude
            delete par.longtitude
            axios
              .get('http://194.58.104.20/SaveControlPoint.php', {
                params: par,
              })
              .then(res => {
                if (res.data[0].Result) {
                  this.$emit('refresh')
                }
              })
          }
        })
        arrCT.forEach(el => {
          let par = Object.assign({}, this.pointById(el))
          par.geozone_id = this.geozone.id
          par.sessionId = this.sessionID
          par.longitude = par.longtitude
          delete par.longtitude
          axios
            .get('http://194.58.104.20/SaveControlPoint.php', {
              params: par,
            })
            .then(res => {
              if (res.data[0].Result) {
                this.$emit('refresh')
              }
            })
        })

        let arrRT = this.geozone.routes.model
        if (arrRT[0].value) {
          arrRT = arrRT.map(x => x.value)
        }
        let itemsRT = this.geozone.routes.items
        let arrPntToDeleteRT = itemsRT.filter(x => !arrRT.find(y => y === x)).map(x => x.value)

        arrPntToDeleteRT.forEach(el => {
          if (this.paths.find(e => e.id === el).geozone_id === parseInt(this.geozone.id, 10)) {
            let par = Object.assign({}, this.paths.find(e => e.id === el))
            par.geozone_id = 0
            par.sessionId = this.sessionID
            axios
              .get('http://194.58.104.20/SaveRoute.php', {
                params: par,
              })
              .then(res => {
                if (res.data[0].Result) {
                  this.$emit('refresh')
                }
              })
          }
        })
        arrRT.forEach(el => {
          let par = Object.assign({}, this.paths.find(e => e.id === el))
          par.geozone_id = this.geozone.id
          par.sessionId = this.sessionID
          axios
            .get('http://194.58.104.20/SaveRoute.php', {
              params: par,
            })
            .then(res => {
              if (res.data[0].Result) {
                this.$emit('refresh')
              }
            })
        })
        this.refreshZones()
      },
      reviewZone (item) {
        if (item == null) {
          this.geozone.isShow = false
        } else {
          this.geozone.isShow = true
          this.geozone.name = item.name
          this.geozone.id = item.id
          let pntToGeo = this.points.filter(x => x.geozone_id === parseInt(item.id, 10)).map(x => ({ text: `${x.name}(${x.direction_id ? 'Обратное' : 'Прямое'})`, value: x.id }))
          let pntFree = this.points.filter(x => x.geozone_id === 0).map(x => ({ text: `${x.name}(${x.direction_id ? 'Обратное' : 'Прямое'})`, value: x.id }))
          this.geozone.controlPoints.model = pntToGeo
          this.geozone.controlPoints.items = pntToGeo.concat(pntFree)
          let routeToGeo = this.paths.filter(x => x.geozone_id === parseInt(item.id, 10)).map(x => { return { text: x.name, value: x.id } })
          let routeFree = this.paths.filter(x => x.geozone_id === 0).map(x => ({ text: x.name, value: x.id }))
          this.geozone.routes.model = routeToGeo
          this.geozone.routes.items = routeToGeo.concat(routeFree)
        }
      },
      ...mapMutations(['setNewGeoArr', 'setPointsArray']),
    },
  }
</script>

<style lang="scss" scoped>
.newGeoInput {
  position: relative;

  .v-btn {
    position: absolute;
    top: 10px;
    right:0;
  }
}
</style>
