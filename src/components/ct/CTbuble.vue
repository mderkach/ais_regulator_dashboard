<template>
  <div class="point-buble__wrapper">
    <v-card
      dark
      class="point-buble__card"
    >
      <v-form @submit.prevent="createMarker($event)">
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <span v-if="isChangeMode">
                Изменение точки маршрута
              </span>
              <span v-else>
                Создание точки маршрута
              </span>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col
                  v-for="(input, i) in inputs"
                  :key="i"
                  cols="12"
                  :md="input.isGeozone ? '12' : '4'"
                >
                  <template v-if="input.isGeozone">
                    <v-text-field
                      v-model="point.geozone"
                      dark
                      disabled
                      :label="input.label"
                    />
                  </template>
                  <template v-else-if="!input.isSelect">
                    <v-text-field
                      v-model="point[input.name]"
                      dark
                      :label="input.label"
                    />
                  </template>
                  <template v-else-if="input.isSelect">
                    <v-select
                      v-model="point[input.name]"
                      :value="point[input.name]"
                      dark
                      :items="input.options"
                      :label="input.label"
                    />
                  </template>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <div class="point-buble__footer">
                <button
                  class="point-buble__button"
                  type="submit"
                  data-action="submit"
                >
                  Ок
                </button>
                <button
                  v-if="isChangeMode"
                  class="point-buble__button"
                  type="button"
                  data-action="delete"
                  @click="deleteMarker()"
                >
                  Удалить
                </button>
                <button
                  class="point-buble__button"
                  type="button"
                  data-action="cancel"
                  @click="closeMarker()"
                >
                  Отмена
                </button>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Buble',
    props: {
      isChangeMode: {
        type: Boolean,
        default: false,
      },
      point: {
        type: Object,
        default: () => ({
          name: '',
          type: '',
          direction: '',
          longtitude: 0,
          latitude: 0,
          radius: 0,
          address: '',
          id: null,
        }),
      },
    },
    data: () => ({
      inputs: [
        {
          name: 'name',
          label: 'Имя остановки',
          isSelect: false,
        },
        {
          name: 'type',
          label: 'Тип КТ',
          isSelect: true,
          options: ['Остановка', 'Участок дороги'],
        },
        {
          name: 'direction',
          label: 'Направление',
          isSelect: true,
          options: ['Прямое', 'Обратное'],
        },
        {
          name: 'longtitude',
          label: 'Широта',
          isSelect: false,
        },
        {
          name: 'latitude',
          label: 'Долгота',
          isSelect: false,
        },
        {
          name: 'radius',
          label: 'Радиус',
          isSelect: false,
        },
        {
          name: 'address',
          label: 'Адрес',
          isSelect: false,
        },
        {
          name: 'geozone_id',
          label: 'Геозона',
          isSelect: false,
          isGeozone: true,
        },
      ],
      geozones: [],
    }),
    computed: {
      ...mapGetters(['sessionID']),
    },
    created: function () {},
    methods: {
      createMarker: function (ev) {
        axios
          .get('http://194.58.104.20/SaveControlPoint.php', {
            params: {
              sessionId: this.sessionID,
              name: this.point.name,
              type: this.point.type === 'Остановка' ? 0 : 1,
              latitude: this.point.latitude,
              longitude: this.point.longtitude,
              radius: this.point.radius,
              address: this.point.address,
              direction_id: this.point.direction === 'Прямое' ? 0 : 1,
              geozone_id: 0,
              id: this.point.id === -2 ? null : this.point.id,
            },
          })
          .then(res => {
            if (res.data[0].Result) {
              this.$emit('refresh')
            }
          })
      },
      closeMarker: function () {
        this.$emit('close')
      },
      deleteMarker: function (id) {
        axios
          .get('http://194.58.104.20/DeleteControlPoint.php', {
            params: {
              sessionId: this.sessionID,
              id: this.point.id,
            },
          })
          .then(res => {
            if (res.data[0].Result) {
              this.$emit('refresh')
            }
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
.point {
  &-buble {
    &__wrapper {
      //позиционирование только для демо режима
      z-index: 500;
      border-radius: 10px;
      overflow: hidden;
    }
    &__card {
      border-radius: 10px;
      width: 100%;
      height: 100%;
      font-size: 17px;
    }

    &__footer {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    &__button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      max-width: 180px;
      height: 40px;
      margin: 10px 5px 0 5px;
      border-radius: 3px;
      color: #fff;
      border: 1px solid transparent;
      background: #ff884d;

      &:hover {
        cursor: pointer;
        background-color: #ff7733;
      }

      &:last-child {
        background: #20242b;
        border-color: #ff884d;

        &:hover {
          cursor: pointer;
          background: #303540;
          border-color: #ff7733;
        }
      }
    }
  }
}
</style>
