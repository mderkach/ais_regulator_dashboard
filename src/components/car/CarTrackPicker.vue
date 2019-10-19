<template>
  <div
    class="car-track-picker"
  >
    <v-container>
      <v-row>
        <v-col
          cols="12"
          lg="12"
        >
          <span>
            Параметры трека машины <b>{{ chooseCarToTrack }}</b>
          </span>
        </v-col>
      </v-row>
      <div
        v-if="!isHour"
        class="car-track-picker-content"
      >
        <v-row>
          <v-col
            cols="2"
            lg="2"
            style="display:flex"
          >
            <span style="align-self: center;">
              C:
            </span>
          </v-col>
          <v-col
            cols="10"
            lg="10"
            style="position:relative"
          >
            <input
              v-model="hoursFrom"
              type="number"
              class="datepicker-input-time"
              min="00"
              max="23"
            >
            <span style="font-size: 20px;">:</span>
            <input
              v-model="minutesFrom"
              type="number"
              class="datepicker-input-time"
              min="00"
              max="60"
            >
            <v-menu
              v-model="menu1"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  dark
                  readonly
                />
                <v-btn
                  icon
                  :color="color"
                  class="calendar-button"
                  v-on="on"
                >
                  <v-icon>
                    mdi-calendar
                  </v-icon>
                </v-btn>
              </template>
              <v-date-picker
                v-model="date"
                :color="color"
                locale="ru"
                @input="menu1 = false"
              />
            </v-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="2"
            lg="2"
            style="display:flex"
          >
            <span style="align-self: center;">
              ПО:
            </span>
          </v-col>
          <v-col
            cols="10"
            lg="10"
            style="position:relative"
          >
            <input
              v-model="hoursTo"
              type="number"
              class="datepicker-input-time"
              min="00"
              max="23"
            >
            <span style="font-size: 20px;">:</span>
            <input
              v-model="minutesTo"
              type="number"
              class="datepicker-input-time"
              min="00"
              max="60"
            >
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date2"
                  dark
                  readonly
                />
                <v-btn
                  icon
                  :color="color"
                  class="calendar-button"
                  v-on="on"
                >
                  <v-icon>
                    mdi-calendar
                  </v-icon>
                </v-btn>
              </template>
              <v-date-picker
                v-model="date2"
                :color="color"
                locale="ru"
                @input="menu2 = false"
              />
            </v-menu>
          </v-col>
        </v-row>
      </div>
      <v-row>
        <v-col
          cols="12"
          lg="12"
        >
          <v-checkbox
            v-model="isHour"
            dark
            :label="'Выбрать последний час'"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="6"
          lg="6"
        >
          <v-btn
            @click="getTrack"
          >
            Построить
          </v-btn>
        </v-col>
        <v-col
          cols="6"
          lg="6"
        >
          <v-btn
            @click="chooseNewCarToTrack(null)"
          >
            Отмена
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

  import { mapGetters, mapMutations } from 'vuex'
  import axios from 'axios'
  import { chooseColorFunc } from '../../mixins/chooseColorFunc'

  export default {
    mixins: [chooseColorFunc],
    data (vm) {
      return {
        hoursFrom: '00',
        minutesFrom: '00',
        hoursTo: '00',
        minutesTo: '00',
        date: new Date().toISOString().substr(0, 10),
        date2: new Date().toISOString().substr(0, 10),
        menu1: false,
        menu2: false,
        isHour: false,
        isOpen: false,
        color: 'blue darken-2',
      }
    },
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
      ...mapGetters(['chooseCarToTrack', 'sessionID']),
    },
    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      },
    },
    mounted: function () {
      this.isOpen = true
    },
    methods: {
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      cartCenter (id) {
        this.setNewCarMapCenter(this.carsGeo[id])
      },
      getTrack () {
        if (this.isHour) {
          console.log('nothig')
        } else {
          let fromTime = `${this.hoursFrom}:${this.minutesFrom}`
          let toTime = `${this.hoursTo}:${this.minutesTo}`
          let from = `${fromTime.length > 1 ? fromTime : ''} ${
            this.date
          }`
          let to = `${toTime.length > 1 ? toTime : ''} ${
            this.date2
          }`
          this.fetchTrack(from, to)
        }
      },
      fetchTrack (fromTime, toTime) {
        axios
          .get('http://194.58.104.20/GetVehicleHistory.php', {
            params: {
              sessionId: this.sessionID,
              vehicleId: this.chooseCarToTrack,
              from: fromTime,
              to: toTime,
            },
          })
          .then(res => {
            let arr = res.data.map(x => [x.latitude, x.longitude])
            const id = `f${(+new Date()).toString(16)}`
            const color = this.chooseColor()
            this.addNewTrack({
              trackId: id,
              vehicleId: this.chooseCarToTrack,
              latLngs: arr,
              color: color,
            })
          })
      },
      ...mapMutations(['setNewCarMapCenter', 'chooseNewCarToTrack', 'addNewTrack']),
    },
  }
</script>

<style lang="scss">
  .car-track-picker {
    width: 100%;
    background-color:#424242;
    border-radius: 5px;
    text-align: center;
    padding: 10px;
    color: white;

    &-title {
      margin-bottom: 0;
    }

    &-content {
      font-size: 18px;
      transition: height ease-in-out 0.3s;

      input[type=number] {
        text-align: center;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }

      }
      .v-text-field, .v-input__slot{
        padding: 0;
        margin: 0;
        font-size:18px;
        max-width: 120px;
        display: inline-block;
      }

      .calendar-button {
          position: absolute;
          top: 9px;
          right: 14px;
          z-index: 600;
      }

      .datepicker-input {

        &-time {
          // border: 1px solid white;
          width: 30px;
          font-size: 20px;
          position: relative;

          &::before {
            content: 'awdaw';
            bottom: -1px;
            left: 0;
            position: absolute;
            border-color: white;
            border-style: solid;
            width: 100%;
          }

          &:last-of-type{
            margin-right: 10px;
          }
        }

        &-wrapper{
          display: flex;
          font-size: 25px;

          & .v-btn, input {
            align-self: center;
          }
        }
      }
    }

    .v-text-field__details, .v-messages{
      display: none;
    }
  }
</style>
