<template>
  <div
    class="map-sidebar-wrapper"
    :class="{'map-sidebar-wrapper-active': isOpen}"
  >
    <div class="map-sidebar">
      <div
        v-for="(car, i) in cars"
        :key="i"
        class="car"
      >
        {{ car.stateNumber }}
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    components: {
    },
    props: {
    },
    data () {
      return {
        isOpen: false,
      }
    },
    computed: {
      ...mapGetters(['cars']),
    },
    mounted: function () {
      this.isOpen = true
    },
    methods: {
    },
  }
</script>

<style lang="scss">
@import './sidebar.scss';
</style>
