<template>
  <v-card
    class="mx-auto routeFind__transport"
    max-width="460"
    dark
    outlined
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="body-1">
          Поиск транспорта
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-form>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            class="py-0"
          >
            <v-text-field
              label="Остановка или номер маршрута"
              outlined
              clearable
              dense
              :hide-details="true"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
  export default {
    name: 'RouteFindTransport',
  }
</script>

<style lang="scss" scoped>
.routeFind {
  &__transport {
    width: 100%;
    margin-bottom: 10px;
    background-color: #21242B;
    color: #fff;
  }
}

</style>
