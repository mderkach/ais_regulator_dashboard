// https://vuex.vuejs.org/en/getters.html

export default {
  geolocation: state => state.geolocation,
  sessionID: state => state.sessionID,
  carsGeo: state => state.carsGeo,
  points: state => state.points,
  pointById: state => id => state.points.find(p => p.id === id),
  chooseCarToTrack: state => state.chooseCarToTrack,
  chooseTrackToChange: state => state.chooseTrackToChange,
  mapTracks: state => state.mapTracks,
  geozones: state => state.geozones,
  getCarTracks: state => id => state.mapTracks.filter(x => x.vehicleId === id),
}
