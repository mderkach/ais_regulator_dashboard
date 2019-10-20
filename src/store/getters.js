// https://vuex.vuejs.org/en/getters.html

export default {
  geolocation: state => state.geolocation,
  sessionID: state => state.sessionID,
  carsGeo: state => state.carsGeo,
  chooseCarToTrack: state => state.chooseCarToTrack,
  chooseTrackToChange: state => state.chooseTrackToChange,
  mapTracks: state => state.mapTracks,
  getCarTracks: state => id => state.mapTracks.filter(x => x.vehicleId === id),
}
