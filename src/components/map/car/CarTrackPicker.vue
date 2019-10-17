<template>
  <div
    class="car-track-picker"
  >
    <v-container>
      <v-row>
        <p class="car-track-picker-title">
          Параметры трека машины <b>{{ chooseCarToTrack }}</b>
        </p>
        <v-checkbox
          v-model="isHour"
          dark
          :label="'За час'"
        />
      </v-row>
      <div
        v-if="!isHour"
        class="car-track-picker-content-datepicker"
      >
        <v-row>
          <v-col
            cols="12"
            lg="12"
          >
            Начальное время
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            lg="12"
            class="datepicker-input-wrapper"
          >
            <input
              type="time"
              class="datepicker-input-time"
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
                <v-btn
                  icon
                  color="white"
                  v-on="on"
                >
                  <v-icon>
                    mdi-calendar
                  </v-icon>
                </v-btn>
              </template>
              <v-date-picker
                v-model="date"
                color="deep-orange accent-4"
                locale="ru"
                @input="menu1 = false"
              />
            </v-menu>
            <!-- <p>Date in ISO format: <strong>{{ date }}</strong></p> -->
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            lg="12"
          >
            Начальное время
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="5"
            lg="5"
            style="display:flex"
          >
            <input
              type="time"
              class="car-track-picker-content-datepicker--time"
            >
          </v-col>
          <v-col
            cols="7"
            lg="7"
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
                  v-model="date"
                  dark
                  readonly
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="date"
                color="deep-orange accent-4"
                locale="ru"
                @input="menu2 = false"
              />
            </v-menu>
            <!-- <p>Date in ISO format: <strong>{{ date }}</strong></p> -->
          </v-col>
        </v-row>
      </div>
      <v-btn>Построить</v-btn>
    </v-container>
  </div>
</template>

<script>

  import { mapGetters, mapMutations } from 'vuex'

  export default {
    data (vm) {
      return {
        date: new Date().toISOString().substr(0, 10),
        date2: new Date().toISOString().substr(0, 10),
        dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
        menu1: false,
        menu2: false,
        isHour: false,
        isOpen: false,
      }
    },
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
      ...mapGetters(['chooseCarToTrack']),
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
      chooseTrack () {
        this.$emit('choose-track')
      },
      ...mapMutations(['setNewCarMapCenter']),
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
      margin-bottom: 20px;
    }

    &-content {
      padding: 0 30px;

    & .datepicker-input {

      &-time{
        min-width: 90px;
        // border: 1px solid white;
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

    .v-text-field, .v-input__slot{
      padding: 0;
      margin: 0;
    }
    .v-text-field__details, .v-messages{
      display: none;
    }
  }
</style>
