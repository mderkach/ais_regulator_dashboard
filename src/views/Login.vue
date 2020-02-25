<template>
  <div
    class="login-page"
  >
    <v-container>
      <v-row>
        <v-col
          cols="6"
          offset="3"
          class="text-center"
        >
          <div style="margin-top: 30vh" />
          <p class="title font-regular text-center">
            Региональная система управления автомобильным транспортом и городским наземным электрическим транспортом, осуществляющим регулярную перевозку пассажиров и багажа
          </p>
          <h1 class="headline text-center mb-10">
            АИС «Управление транспортом»
          </h1>

          <p class="body-1 text-center">
            Региональный сегмент субъекта РФ Ставропольский край
          </p>

          <v-btn
            to="/monitor-car"
          >
            Войти
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data: () => ({
      bg: require('../assets/login.jpg'),
    }),
  }
</script>

<style lang="scss" scoped>
.login {
  &-page {
    width: 100vw;
    height: 100vh;
    background: radial-gradient(20.55% 37.9% at 50% 60.09%, #000000 0%, rgba(26, 26, 26, 0) 100%), url('../assets/login.jpg');
    color: #fff;
  }
}
</style>
