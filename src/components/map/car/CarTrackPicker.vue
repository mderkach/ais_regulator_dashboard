<template>
  <div
    class="car-track-picker"
  >
    <p class="car-track-picker-title">
      Параметры трека машины <b>{{ chooseCarToTrack }}</b>
    </p>
    <div class="car-track-picker-content">
      <v-checkbox
        v-model="isHour"
        dark
        :label="`За час`"
      />
      <div
        v-if="!isHour"
        class="car-track-picker-content-datepicker"
      >
        <v-row>
          <v-col
            cols="5"
            lg="5"
            style="display:flex"
          >
            <v-text-field
              dark
            >
              <input
                type="time"
                class="car-track-picker-content-datepicker--time"
              >
            </v-text-field>
          </v-col>
          <v-col
            cols="7"
            lg="7"
          >
            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="dateFormatted"
                  dark
                  persistent-hint
                  outlined
                  @blur="date = parseDate(dateFormatted)"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="date"
                color="deep-orange accent-3"
                no-title
                @input="menu1 = false"
              />
            </v-menu>
            <!-- <p>Date in ISO format: <strong>{{ date }}</strong></p> -->
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="5"
            lg="5"
            style="display:flex"
          >
            <v-text-field
              dark
            >
              <input
                type="time"
                class="car-track-picker-content-datepicker--time"
              >
            </v-text-field>
          </v-col>
          <v-col
            cols="7"
            lg="7"
          >
            <v-menu
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="dateFormatted"
                  outlined
                  dark
                  persistent-hint
                  @blur="date2 = parseDate(dateFormatted)"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="date2"
                color="deep-orange accent-3"
                no-title
                @input="menu2 = false"
              />
            </v-menu>
            <!-- <p>Date in ISO format: <strong>{{ date }}</strong></p> -->
          </v-col>
        </v-row>
      </div>
      <v-btn>Построить</v-btn>
    </div>
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

      &-datepicker{
      }
    }
  }
</style>
