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
          @click="chooseTrack(car.vehicleId)"
        >
          <v-icon>mdi-chart-timeline-variant</v-icon>
        </v-btn>
        <v-btn
          text
          icon
          color="white"
        >
          <v-icon>mdi-av-timer</v-icon>
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
    },
    data () {
      return {
        isOpen: false,
      }
    },
    computed: {
      ...mapGetters(['cars', 'carsGeo', 'getCarTracks']),
    },
    mounted: function () {
      this.isOpen = true
    },
    methods: {
      cartCenter (id) {
        if (this.chooseCarMode) {
          this.chooseNewCarToTrack(id)
        }
        this.setNewCarMapCenter(this.carsGeo[id])
      },
      chooseTrack (id) {
        this.chooseNewCarToTrack(id)
      },
      ...mapMutations(['setNewCarMapCenter', 'chooseNewCarToTrack', 'deleteTrack']),
    },
  }
</script>

<style lang="scss">
.v-expansion-panel-content__wrap {
  padding: 5px 15px;
}

@keyframes slidein {
  from {
    height: 0;
    margin-top: 0;
  }

  to {
    height: 77px;
    margin-top: 20px;
  }
}
.car {
  .trackBar {
    transition: opacity ease-in-out 0.5s;
    height: 0;
    width: 110%;
    margin-left: -2px;

    &-first-active{
      margin-top: 10px;
      // animation-duration: 0.3s;
      // animation-name: slidein;
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
