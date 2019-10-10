<template>
  <div class="wrapper__controls_map">
    <button
      class="btn__control_map --locatecontrol"
      @click="findLocation"
    >
      <svg
        class="btn__control_map_svg"
        width="18"
        height="26"
        viewBox="0 0 18 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="is-filled"
          d="M9.0341 4.47754C11.9494 4.47754 14.3213 6.84932 14.3213 9.76463C14.3213 12.6799 11.9494 15.0517 9.0341 15.0517C6.11879 15.0517 3.74691 12.6799 3.74691 9.76463C3.74691 6.84932 6.11879 4.47754 9.0341 4.47754ZM9.0341 13.6295C11.1653 13.6295 12.8992 11.8957 12.8992 9.76454C12.8992 7.63337 11.1653 5.89964 9.0341 5.89964C6.90294 5.89964 5.16901 7.63347 5.16901 9.76463C5.16901 11.8958 6.90284 13.6295 9.0341 13.6295Z"
          fill="white"
        />
        <path
          class="is-filled"
          d="M9.03449 0.799072C13.9781 0.799072 18 4.82097 18 9.76458C18 12.6156 15.609 16.8632 14.1837 19.1414C13.246 20.6402 12.2383 22.0666 11.3464 23.1579C9.91468 24.9093 9.40225 25.0559 9.0344 25.0559C8.66105 25.0559 8.17725 24.9092 6.75003 23.1568C5.85609 22.059 4.84792 20.6334 3.91113 19.1425C2.47613 16.8588 0.0688934 12.6036 0.0688934 9.76448C0.0688934 4.82097 4.09079 0.799072 9.03449 0.799072ZM4.89703 18.0352C6.7359 21.02 8.42413 23.037 9.04293 23.5519C9.66496 23.0528 11.3258 21.0839 13.1904 18.0446C15.3431 14.5354 16.5778 11.5174 16.5778 9.76458C16.5779 5.60512 13.194 2.22118 9.03449 2.22118C4.87503 2.22118 1.49109 5.60512 1.49109 9.76458C1.491 11.5073 2.73249 14.5218 4.89703 18.0352Z"
          fill="white"
        />
      </svg>
    </button>
    <button
      class="btn__control_map"
      @click="zoomIn"
    >
      <svg
        class="btn__control_map_svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="is-filled"
          d="M19.2188 9.21875H10.7812V0.78125C10.7812 0.349766 10.4315 0 10 0C9.56852 0 9.21875 0.349766 9.21875 0.78125V9.21875H0.78125C0.349766 9.21875 0 9.56852 0 10C0 10.4315 0.349766 10.7812 0.78125 10.7812H9.21875V19.2188C9.21875 19.6502 9.56852 20 10 20C10.4315 20 10.7812 19.6502 10.7812 19.2188V10.7812H19.2188C19.6502 10.7812 20 10.4315 20 10C20 9.56852 19.6502 9.21875 19.2188 9.21875Z"
          fill="white"
        />
      </svg>
    </button>
    <button
      class="btn__control_map"
      @click="zoomOut"
    >
      <svg
        class="btn__control_map_svg"
        width="20"
        height="2"
        viewBox="0 0 20 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="is-filled"
          d="M19.2188 0.21875H0.78125C0.349766 0.21875 0 0.568516 0 1C0 1.43148 0.349766 1.78125 0.78125 1.78125H19.2188C19.6502 1.78125 20 1.43148 20 1C20 0.568516 19.6502 0.21875 19.2188 0.21875Z"
          fill="white"
        />
      </svg>
    </button>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        name: 'asd',
      }
    },
    computed: {
      ...mapGetters(['geolocation']),
    },
    watch: {
      geolocation (newGeo, oldGeo) {
        if (newGeo) {
          this.findLocation()
        }
      },
    },
    methods: {
      zoomIn () {
        this.$parent.$refs.osm.mapObject.zoomIn()
      },
      zoomOut () {
        this.$parent.$refs.osm.mapObject.zoomOut()
      },
      findLocation () {
        let self = this
        if (navigator.geolocation) {
          let cordsArray = []
          navigator.geolocation.getCurrentPosition(function (position) {
            let geoposition = position.coords
            cordsArray.push(geoposition.latitude, geoposition.longitude)
            self.$store.commit('setGeolocation', cordsArray)
          })
        }
      },
    },
  }
</script>

<style lang="scss">
.wrapper {
  &__controls {
    &_map {
      position: absolute;
      top: 50%;
      right: 10px;
      display: flex;
      flex-direction: column;
      z-index: 400;
      transform: translateY(-50%);
    }
  }
}

.btn {
  &__control {
    &_map {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      margin-bottom: 12px;
      border-color: #21242b;
      background: #21242b;
      border-radius: 3px;

      &:hover {
        .btn__control_map_svg {
          .is-filled {
            fill: #ffccb2;
          }
        }
      }

      &:focus {
        .btn__control_map_svg {
          .is-filled {
            fill: #ff7733;
          }
        }
      }
    }
  }
}
</style>
