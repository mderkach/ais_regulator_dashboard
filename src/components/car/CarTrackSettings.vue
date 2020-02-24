<template>
  <div class="track-change">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          lg="12"
        >
          <span>
            Параметры трека
          </span>
          <br>
          <span style="font-size: 15px; font-style: italic;font-weight: bold">
            {{
              chooseTrackToChange ? chooseTrackToChange.trackId : "Обработка"
            }}
          </span>
        </v-col>
      </v-row>
      <div
        v-if="chooseTrackToChange"
        class="track-change-content"
      >
        <v-row>
          <v-col
            cols="12"
            lg="12"
          >
            <v-color-picker
              v-model="chooseTrackToChange.color"
              hide-canvas
              show-swatches
              width="100%"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            lg="12"
          >
            <v-slider
              v-model="chooseTrackToChange.weight"
              dark
              label="Толщина линии"
              min="1"
              max="7"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            lg="12"
          >
            <v-btn @click="chooseNewTrackToChange(null)">
              Применить
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
  import { chooseColorFunc } from '../../mixins/chooseColorFunc'
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    mixins: [chooseColorFunc],
    data: vm => ({}),
    computed: {
      ...mapGetters(['chooseTrackToChange']),
    },
    watch: {},
    mounted: function () {
      this.isOpen = true
    },
    methods: {
      close () {
        this.$emit('closeMenu', 1)
      },
      ...mapMutations(['chooseNewTrackToChange']),
    },
  }
</script>

<style lang="scss">
.track-change {
  width: 100%;
  background-color: #424242;
  border-radius: 5px;
  text-align: center;
  padding: 10px;
  color: white;

  &-content {
    font-size: 18px;
  }
}
</style>
