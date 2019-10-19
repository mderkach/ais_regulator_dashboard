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
            <v-subheader>Список классификаторов</v-subheader>
            <v-list-item-group
              color="primary"
            >
              <v-list-item
                v-for="(item, i) in classifiers"
                :key="i"
                @click="showTable"
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
        <div class="classifiers-table-wrapper">
          <v-data-table
            v-if="table.isShow"
            :headers="table.headers"
            :items="table.items"
          >
            <template v-slot:top>
              <v-toolbar
                flat
                color="white"
              >
                <v-toolbar-title>{{ table.header }}</v-toolbar-title>
              </v-toolbar>
            </template>
          </v-data-table>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import mapSidebar from '../components/sidebar/MapSidebar'

  export default {
    name: 'Classifiers',
    components: {
      mapSidebar,
    },
    data () {
      return {
        classifiers: [
          { name: 'Виды регулярных перевозок' },
          { name: 'Статусы' },
          { name: 'Категории транспортных средств (ТС)' },
          { name: 'Класс ТС (вместимость)' },
          { name: 'Класс ТС (длина)' },
          { name: 'Маски регистрационных знаков ТС' },
          { name: 'Типы документов' },
          { name: 'Муниципальные образования' },
          { name: 'Порядок посадки/выгрузки пассажиров' },
          { name: 'Тип точки' },
          { name: 'Типы маршрутов' },
          { name: 'Типы ТС' },
          { name: 'Типы календаря' },
          { name: 'Экологический класс ТС' },
          { name: 'Состав ТС' },
          { name: 'Часовые пояса' },
          { name: 'Типы объектов' },
          { name: 'Сервисные стоянки' },
          { name: 'Организационно-правовые формы' },
          { name: 'Варианты контроля без движения' },
          { name: 'Марка ТС' },
        ],
        table: {
          header: '',
          headers: [],
          items: [],
          isShow: false,
        },
      }
    },
    methods: {
      showTable () {
        this.table.isShow = true
      },
    },
  }
</script>

<style lang="scss">
.classifiers {
  &-sidebar {
    position: relative;
    top: 0;
    width: 100%;
    max-height: 85vh;
    border-radius: 4px;

    &.side-active {
      left: 0;
    }
  }

  &-table {
    &-wrapper {
      width: 100%;
      max-height: 85vh;
      overflow: hidden;
      border-radius: 4px;
    }
  }
}
</style>
