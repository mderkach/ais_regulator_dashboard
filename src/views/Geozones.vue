<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="3"
      >
        <map-sidebar
          :class="'side-active classifiers-sidebar'"
        >
          <v-list nav>
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
            <v-list-item-group
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
                <v-btn block>
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
        filteredList: [],
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
      axios
        .get('http://194.58.104.20/GetControlPoints.php', {
          params: {
            sessionId: this.sessionID,
          },
        })
        .then(res => {
          this.setPointsArray(res.data[0].ControlPoints)
        })
      axios
        .get('http://194.58.104.20/GetGeozones.php')
        .then(res => {
          this.setNewGeoArr(res.data)
        }).then(() => {
          this.filteredList = this.geozones
        })
    },
    methods: {
      initializeZone () {
        this.geozone.isShow = true
        this.createZone = true
        // присвоить this.geozone geozoneTemplate из state и творить магию дальше
      },
      createNewGeozone () {
        // v-item--active v-list-item--active
        // this.geozones.push({ name: this.felterWord })
        this.feilteredList = this.geozones.filter(x => x.name.indexOf(this.felterWord, 0) !== -1)
        this.showBtn = false
        this.reviewZone({ name: this.filterWord })
      },
      saveChanges () {
        let arr = this.geozone.controlPoints.model
        let items = this.geozone.controlPoints.items
        let arrPntToDelete = items.filter(x => !arr.find(y => y === x.value))
        arrPntToDelete.forEach(el => {
          if (this.pointById(el.value).geozone_id == this.geozone.id) {
            let par = this.pointById(el.value)
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
        arr.forEach(el => {
          let par = this.pointById(el)
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
      },
      reviewZone (item) {
        this.geozone.isShow = true
        this.geozone.name = item.name
        this.geozone.id = item.id
        let pntToGeo = this.points.filter(x => x.geozone_id == item.id).map(x => { return { text: x.name, value: x.id } })
        let pntFree = this.points.filter(x => x.geozone_id === 0).map(x => { return { text: x.name, value: x.id } })
        this.geozone.controlPoints.model = pntToGeo
        this.geozone.controlPoints.items = pntToGeo.concat(pntFree)
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
</style>>
