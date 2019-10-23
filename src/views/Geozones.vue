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
                v-model="felterWord"
                :label="`Название${feilteredList.length === 0? ' новой ' : ' '}геозоны`"
                outlined
                @focus="showBtn = true"
              />
              <v-btn
                v-if="feilteredList.length === 0"
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
                v-for="(item, i) in feilteredList"
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
                <v-btn block>
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

  export default {
    name: 'Geozones',
    components: {
      mapSidebar,
    },
    data: vm => {
      return {
        newGeo: '',
        createZone: false,
        geozones: [
          { name: 'Ставрополь' },
          { name: 'Михайловск' },
          { name: 'село Александровское' },
          { name: 'село Грушевое' },
          { name: 'озеро Егорлык' },
          { name: 'Серега' },
        ],
        felterWord: '',
        showBtn: false,
        feilteredList: [],
      }
    },
    computed: {
      ...mapState(['geozone', 'defaultGeozone']),
    },
    watch: {
      felterWord (val) {
        this.feilteredList = this.geozones.filter(x => x.name.indexOf(this.felterWord, 0) !== -1)
      },
    },
    created: function () {
      this.feilteredList = this.geozones
    },
    methods: {
      initializeZone () {
        this.geozone.isShow = true
        this.createZone = true
        // присвоить this.geozone geozoneTemplate из state и творить магию дальше
      },
      createNewGeozone () {
        // v-item--active v-list-item--active
        this.geozones.push({ name: this.felterWord })
        this.feilteredList = this.geozones.filter(x => x.name.indexOf(this.felterWord, 0) !== -1)
        this.showBtn = false
        this.reviewZone({ name: this.felterWord })
      },
      reviewZone (item) {
        this.geozone.isShow = true
        this.geozone.name = item.name
      },
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
