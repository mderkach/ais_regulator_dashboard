<template>
  <div
    class="map-sidebar-wrapper"
    :class="{'map-sidebar-wrapper-active': isOpen}"
  >
    <div class="map-sidebar" />
  </div>
</template>

<script>
  export default {
    props: {
      points: {
        type: Array,
        default: new Array([]),
      },
    },
    data () {
      return {
        isOpen: false,
      }
    },
    mounted: function () {
      this.isOpen = true
    },
    methods: {
    },
  }
</script>

<style lang="scss">
@import '../sidebar/sidebar;
</style>
