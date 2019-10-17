// https://vuex.vuejs.org/en/getters.html

export default {
  geolocation: state => state.geolocation,
  sessionID: state => state.sessionID,
  cars: state => state.cars,
  carsGeo: state => state.carsGeo,
  carMapCenter: state => state.carMapCenter,
  chooseCarToTrack: state => state.chooseCarToTrack,
}
