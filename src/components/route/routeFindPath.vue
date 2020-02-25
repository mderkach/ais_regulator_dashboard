<template>
  <v-card
    class="mx-auto routeFind__path"
    max-width="460"
    dark
    outlined
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="body-1">
          Построение маршрута
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-form>
      <v-container>
        <v-row>
          <v-col
            cols="2"
            class="py-0"
          >
            <v-btn
              class="routeFind__toggle"
              color="#FF7733"
              dark
              @click="switchRoute(from, to)"
            >
              <v-icon style="transform: rotate(-45deg)">
                mdi-arrow-expand
              </v-icon>
            </v-btn>
          </v-col>
          <v-col
            cols="10"
            class="pa-0"
          >
            <v-col
              cols="12"
              class="pt-0"
            >
              <v-text-field
                v-model="from"
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
              class="pb-0"
            >
              <v-text-field
                v-model="to"
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
    data: () => ({
      from: '',
      to: '',
    }),
    methods: {
      switchRoute (from, to) {
        this.to = from
        this.from = to
      },
    },
  }
</script>

<style lang="scss" scoped>
.routeFind {
  &__path {
    width: 100%;
    margin-bottom: 10px;
    background-color: #21242B;
    color: #fff;
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
