<template>
  <v-app>
    <core-app-bar />

    <core-drawer />

    <core-view />
  </v-app>
</template>

<script>
  import axios from 'axios'
  export default {
    components: {
      CoreDrawer: () => import('@/components/core/Drawer'),
      CoreAppBar: () => import('@/components/core/AppBar'),
      CoreView: () => import('@/components/core/View'),
    },
    created: function () {
      axios
        .get('http://194.58.104.20/Login.php?login=Диспетчер&password=12345678')
        .then(res => {
          this.sessionID = res.data[0].SessionId // сохраняем id сессиии
          return res.data[0].SessionId
        })
        .then(sessoinID => {
          this.$store.commit('setSessionID', sessoinID)
        })
    },
  }
</script>
