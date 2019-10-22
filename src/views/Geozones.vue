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
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    v-on="on"
                    @click="initializeZone"
                  >
                    <v-icon>mdi-plus-circle</v-icon>
                  </v-btn>
                </template>
                <span>Добавить новую геозону</span>
              </v-tooltip>
            </v-toolbar>
            <v-divider />
            <v-list-item-group
              color="primary"
            >
              <v-list-item
                v-for="(item, i) in geozones"
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
    data () {
      return {
        createZone: false,
        geozones: [
          { name: 'a' },
          { name: 'b' },
        ],
      }
    },
    computed: {
      ...mapState(['geozone', 'defaultGeozone']),
    },
    methods: {
      initializeZone () {
        this.geozone.isShow = true
        this.createZone = true
        // присвоить this.geozone geozoneTemplate из state и творить магию дальше
      },
      reviewZone (item) {
        this.geozone.isShow = true
        this.geozone.name = item.name
      },
    },
  }
</script>
