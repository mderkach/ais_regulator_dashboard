// https://vuex.vuejs.org/en/mutations.html

export default {
  setGeolocation (state, payload) {
    state.geolocation = payload
  },
  setSessionID (state, payload) {
    state.sessionID = payload
  },
  setCarsArray (state, payload) {
    state.cars = payload
  },
  setCarsGeoArray (state, payload) {
    state.carsGeo = payload
  },
  setNewCarMapCenter (state, payload) {
    state.carMapCenter = payload
  },
  chooseNewCarToTrack (state, payload) {
    state.chooseCarToTrack = payload
  },
}
