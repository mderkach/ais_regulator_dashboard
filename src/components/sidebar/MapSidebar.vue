<template>
  <div
    class="map-sidebar-wrapper"
    :class="{ 'map-sidebar-wrapper-right': right, 'map-sidebar-wrapper-left': !right}"
  >
    <slot />
  </div>
</template>

<script>
  export default {
    props: {
      right: {
        type: Boolean,
        default: false,
      },
    },
    created: function () {
    },
    mounted: function () {
    },
    methods: {
    },
  }
</script>

<style lang="scss">
@import './sidebar.scss';
</style>
