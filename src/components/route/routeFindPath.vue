<template>
  <v-card
    class="mx-auto routeFind__path"
    max-width="460"
    dark
    outlined
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          Построение маршрута
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="1">
            <v-btn
              class="routeFind__toggle"
              tile
              color="#FF7733"
              dark
            >
              <v-icon style="transform: rotate(-45deg)">
                mdi-arrow-expand
              </v-icon>
            </v-btn>
          </v-col>
          <v-col
            cols="11"
            class="pa-0"
          >
            <v-col
              cols="12"
            >
              <v-text-field
                label="Откуда"
                outlined
                clearable
                dense
                prepend-inner-icon="mdi-map-marker"
                :hide-details="true"
              />
            </v-col>
            <v-col
              cols="12"
            >
              <v-text-field
                label="Куда"
                outlined
                clearable
                dense
                prepend-inner-icon="mdi-map-marker"
                :hide-details="true"
              />
            </v-col>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
  export default {
    name: 'RouteFindPath',
  }
</script>

<style lang="scss" scoped>
.routeFind {
  &__path {
    position: absolute;
    top: 10px;
    left: 30px;
    width: 100%;
    background-color: #21242B;
    color: #fff;
    z-index: 500;
  }

  &__toggle {
    display: block;
    width: 80%;
    height: 100% !important;
    max-width: 100%;
    min-width: 20% !important;
    max-height: 100%;
    margin: 0 auto;
  }
}

</style>
