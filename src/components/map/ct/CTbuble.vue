<template>
  <div class="point-buble__wrapper">
    <v-card
      dark
      class="point-buble__card"
    >
      <v-form>
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <span
                v-if="isChangeMode"
              >
                Изменение точки маршрута
              </span>
              <span
                v-else
              >
                Создание точки маршрута
              </span>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col
                  v-for="(input, i) in inputs"
                  :key="i"
                  cols="12"
                  md="4"
                >
                  <template v-if="!input.isSelect">
                    <v-text-field
                      v-model="point[input.name]"
                      dark
                      :label="input.label"
                      outlined
                    />
                  </template>
                  <template v-if="input.isSelect">
                    <v-select
                      v-model="point[input.name]"
                      :value="point[input.name]"
                      dark
                      :items="input.options"
                      :label="input.label"
                      outlined
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
                  @click="deleteMarker(bubleID)"
                >
                  Удалить
                </button>
                <button
                  class="point-buble__button"
                  type="button"
                  data-action="cancel"
                  @click="closeMarker(bubleID)"
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
  export default {
    name: 'Buble',
    data () {
      return {
        isChangeMode: false,
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
            options: ['Туда', 'Сюда'],
          },
          {
            name: 'longitude',
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
        ],
        point: {
          name: 'Вот',
          type: 'Остановка',
          direction: 'Туда',
          longitude: 123,
          latitude: 99,
          radius: 3,
          address: 'asd qwe',
        },
        defaultPoint: {
          name: '',
          type: '',
          direction: '',
          longitude: 0,
          latitude: 0,
          radius: 0,
          address: '',
        },
      }
    },
    methods: {
      createMarker: function (ev) {
        // userLocationBus.$emit('createWaypoint', ev)
      },
      closeMarker: function (id) {
        // userLocationBus.$emit('closePointPopup', id)
      },
      deleteMarker: function (id) {
        // userLocationBus.$emit('deleteWaypoint', id)
      },
    },
  }
</script>

<style lang="scss">
.point {
  &-buble {
    &__wrapper {
      //позиционирование только для демо режима
      position: absolute;
      top: 5vh;
      left: 5vw;
      z-index: 500;
    }

    &__card {
      width: 100%;
      max-width: 70%;
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
