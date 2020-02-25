<template>
  <v-card
    class="mx-auto login"
    max-width="460"
    dark
    outlined
  >
    <v-card-actions>
      <v-btn to="/login">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'ContorlsLogin',
  }
</script>

<style lang="scss" scoped>
.login {
  position: absolute;
  right: 10px;
  bottom: 30px;
  background-color: #21242B;
  z-index: 500;
}
</style>
