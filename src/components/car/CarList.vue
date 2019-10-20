<template>
  <v-expansion-panels
    focusable
    accordion
    dark
  >
    <v-expansion-panel
      v-for="(car, i) in cars"
      :key="i"
      class="car"
    >
      <v-expansion-panel-header
        @click="cartCenter(car.vehicleId)"
      >
        {{ car.stateNumber }}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-btn
          text
          icon
          color="white"
          @click="cartCenter(car.vehicleId)"
        >
          <v-icon>mdi-crosshairs-gps</v-icon>
        </v-btn>
        <v-btn
          text
          icon
          color="white"
          @click="chooseTrack({id: car.vehicleId, num: car.stateNumber})"
        >
          <v-icon>mdi-chart-timeline-variant</v-icon>
        </v-btn>
        <v-btn
          text
          icon
          color="deep-orange accent-3"
        >
          <v-icon>mdi-settings</v-icon>
        </v-btn>
        <div
          class="trackBar"
          :class="{'trackBar-first-active': getCarTracks(car.vehicleId).length == 1,'trackBar-active': getCarTracks(car.vehicleId).length > 1}"
        >
          <v-chip
            v-for="(track, trackNo) in getCarTracks(car.vehicleId)"
            :key="trackNo"
            close
            :color="track.color"
            @click:close="deleteTrack(track.trackId)"
            @click="chooseNewTrackToChange(track.trackId)"
          >
            трек
          </v-chip>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>

  import { mapGetters, mapMutations } from 'vuex'

  export default {
    props: {
      chooseCarMode: {
        type: Boolean,
        default: false,
      },
      cars: {
        type: Array,
        default: new Array([]),
      },
    },
    data () {
      return {
        isOpen: false,
      }
    },
    computed: {
      ...mapGetters(['carsGeo', 'getCarTracks']),
    },
    mounted: function () {
      this.isOpen = true
    },
    methods: {
      cartCenter (id) {
        if (this.chooseCarMode) {
          let car = this.cars.find(x => x.vehicleId === id)
          this.chooseNewCarToTrack({ id: car.vehicleId, num: car.stateNumber })
        }
        this.$emit('chooseCar', this.carsGeo[id])
      },
      chooseTrack (car) {
        this.chooseNewCarToTrack(car)
      },
      ...mapMutations([
        'setNewCarMapCenter',
        'chooseNewCarToTrack',
        'deleteTrack',
        'chooseNewTrackToChange']),
    },
  }
</script>

<style lang="scss">
.v-expansion-panel-content__wrap {
  padding: 5px 15px;
}
.car {
  .trackBar {
    transition: opacity ease-in-out 0.5s;
    height: 0;
    width: 110%;
    margin-left: -2px;

    &-first-active{
      margin-top: 10px;
      height: auto;
    }

    &-active{
      margin-top: 10px;
      height: auto;
    }

    .v-chip {
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }
}
</style>
