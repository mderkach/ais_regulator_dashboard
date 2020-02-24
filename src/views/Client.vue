<template>
  <div class="map">
    <l-map />
    <controls />
    <route-path />
  </div>
</template>

<script>
  import Map from '../components/map/Map'
  import Controls from '../components/controls/Сontrols'
  import routePath from '../components/route/routeFindPath'

  export default {
    name: 'Client',
    components: {
      'l-map': Map,
      Controls,
      routePath,
    },
  }
</script>

<style>

</style>
