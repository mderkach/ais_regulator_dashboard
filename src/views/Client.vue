<template>
  <div class="map">
    <l-map />
    <controls />
  </div>
</template>

<script>
  import Map from '../components/map/Map'
  import Controls from '../components/controls/Сontrols'

  export default {
    name: 'Client',
    components: {
      'l-map': Map,
      Controls,
    },
  }
</script>

<style>

</style>
