<template>
  <div class="map">
    <l-map />
    <controls />
    <div class="client__wrapper">
      <route-path />
      <route-transport />
      <transport-switch />
    </div>
    <login />
  </div>
</template>

<script>
  import Map from '../components/map/Map'
  import Controls from '../components/controls/Сontrols'
  import routePath from '../components/route/routeFindPath'
  import routeTransport from '../components/route/routeFindTransport'
  import transportSwitch from '../components/route/routeTransportSwitch'
  import login from '../components/controls/ContorlsLogin'

  export default {
    name: 'Client',
    components: {
      'l-map': Map,
      Controls,
      routePath,
      routeTransport,
      transportSwitch,
      login,
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
