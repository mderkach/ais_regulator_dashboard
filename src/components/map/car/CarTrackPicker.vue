<template>
  <div
    class="car-track-picker"
  >
    Параметры трека машины {{ chooseCar }}
    <v-btn>Построить трек за час</v-btn>
  </div>
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
      ...mapGetters(['chooseCar']),
    },
    mounted: function () {
      this.isOpen = true
    },
    methods: {
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

<style>
  .car-track-picker {
    width: 100%;
    background-color:#424242;
    border-radius: 5px;
    text-align: center;
    padding: 10px;
    color: white;
  }
</style>
