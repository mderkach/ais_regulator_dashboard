// https://vuex.vuejs.org/en/state.html

export default {
  geolocation: [],
  sessionID: '',
  carsGeo: [],
  points: [],
  chooseCarToTrack: null,
  chooseTrackToChange: null,
  mapTracks: [],
  geozones: [],
  geozone: {
    name: '',
    id: null,
    isShow: false,
    controlPoints: {
      model: '',
      items: [],
    },
    routes: {
      model: '',
      items: [],
    },
    drivers: {
      model: '',
      items: [],
    },
  },
  geozoneTemplate: {
    name: '',
    isShow: false,
    controlPoints: {
      model: '',
      items: [],
    },
    routes: {
      model: '',
      items: [],
    },
    drivers: {
      model: '',
      items: [],
    },
  },
}
