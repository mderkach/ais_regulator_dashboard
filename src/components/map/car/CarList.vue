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
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>

  import { mapGetters, mapMutations } from 'vuex'

  export default {
    data () {
      return {
        isOpen: false,
      }
    },
    computed: {
      ...mapGetters(['cars', 'carsGeo']),
    },
    mounted: function () {
      this.isOpen = true
    },
    methods: {
      cartCenter (id) {
        this.setNewCarMapCenter(this.carsGeo[id])
      },
      chooseTrack (id) {
        this.chooseNewCarToTrack(id)
      },
      ...mapMutations(['setNewCarMapCenter', 'chooseNewCarToTrack']),
    },
  }
</script>

<style lang="scss">
.v-expansion-panel-content__wrap {
  padding: 5px 15px
}
</style>
