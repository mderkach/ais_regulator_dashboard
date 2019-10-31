<template>
  <div
    class="route-picker"
  >
    <v-container>
      <v-row>
        <v-col
          cols="12"
        >
          Маршрут
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
        >
          {{ route.id }}
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
        >
          <v-text-field
            v-model="route.name"
            label="Название маршрута"
            outlined
            dark
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
        >
          <v-text-field
            v-model="route.operationalSpeed"
            label="Рабочая скорость транспорта"
            outlined
            dark
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
        >
          <v-text-field
            v-model="route.geozone"
            label="Геозона"
            outlined
            disabled
            dark
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="6"
          lg="6"
          sm="12"
        >
          <v-btn
            dark
            color="green"
            @click="$emit('change-mode', 1)"
          >
            Прям. напр.
          </v-btn>
          <v-chip-group
            v-if="route.straight[0]"
            multiple
            column
            style="margin-top: 5px;border: 1px solid white; border-radius: 5px; padding: 0px 6px"
          >
            <v-chip
              v-for="(pnt, i) in route.straight"
              :key="i"
              @click="$emit('to-point', pnt.id)"
            >
              {{ pnt.id }}
            </v-chip>
          </v-chip-group>
        </v-col>
        <v-col
          cols="6"
          lg="6"
          sm="12"
        >
          <v-btn
            color="red"
            dark
            @click="$emit('change-mode', 2)"
          >
            Обр. напр.
          </v-btn>
          <v-chip-group
            v-if="route.reverse[0]"
            multiple
            column
            style="margin-top: 5px;border: 1px solid white; border-radius: 5px; padding: 0px 6px"
          >
            <v-chip
              v-for="(pnt, i) in route.reverse"
              :key="i"
              @click="$emit('to-point', pnt.id)"
            >
              {{ pnt.id }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
      <v-row style="justify-content: center">
        <v-col
          cols="5"
          lg="5"
          sm="12"
        >
          <v-btn
            @click="save"
          >
            Сохранить
          </v-btn>
        </v-col>
        <v-col
          cols="5"
          lg="5"
          sm="12"
        >
          <v-btn
            @click="$emit('cansel')"
          >
            Отмена
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

  import { mapGetters } from 'vuex'
  import axios from 'axios'

  export default {
    props: {
      route: {
        type: Object,
        default: () => ({
          id: null,
          name: '',
          straight: [],
          reverse: [],
          color: '1',
          geozone_id: 0,
          operationalSpeed: null,
          transportType: 0,
        }),
      },
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters(['sessionID']),
    },
    mounted: function () {
    },
    methods: {
      save () {
        let par = Object.assign({}, this.route)
        par.sessionId = this.sessionID
        par.straight = JSON.stringify(par.straight)
        par.reverse = JSON.stringify(par.reverse)
        console.log(par)
        axios
          .get('http://194.58.104.20/SaveRoute.php', {
            params: par,
          }).then((res) => {
            if (res.data[0].Result) {
              this.$emit('refresh')
            }
          })
      },
    },
  }
</script>

<style lang="scss">
  .route-picker {
    background-color:#424242;
    border-radius: 5px;
    text-align: center;
    padding: 10px;
    color: white;

    .v-input__slot{
      margin-bottom: 0;
    }

    .v-text-field__details {
      display: none;
    }
  }
</style>
