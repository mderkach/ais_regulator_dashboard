<template>
  <div class="map">
    <l-map />
    <controls />
    <div class="client__wrapper">
      <route-path />
      <route-transport />
    </div>
  </div>
</template>

<script>
  import Map from '../components/map/Map'
  import Controls from '../components/controls/Сontrols'
  import routePath from '../components/route/routeFindPath'
  import routeTransport from '../components/route/routeFindTransport'

  export default {
    name: 'Client',
    components: {
      'l-map': Map,
      Controls,
      routePath,
      routeTransport,
    },
  }
</script>

<style>
.client__wrapper {
  position: absolute;
  top: 10px;
  left: 30px;
  z-index: 500;
  width: 460px;
}
</style>
