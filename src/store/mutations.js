// https://vuex.vuejs.org/en/mutations.html

export default {
  setGeolocation (state, payload) {
    state.geolocation = payload
  },
  setSessionID (state, payload) {
    state.sessionID = payload
  },
  setCarsGeoArray (state, payload) {
    state.carsGeo = payload
  },
  chooseNewCarToTrack (state, payload) {
    state.chooseCarToTrack = payload
  },
  chooseNewTrackToChange (state, payload) {
    state.chooseTrackToChange = state.mapTracks.find(x => x.trackId === payload)
  },
  addNewTrack (state, payload) {
    state.mapTracks.push(payload)
  },
  deleteTrack (state, payload) {
    const ind = state.mapTracks.indexOf(state.mapTracks.find(x => x.trackId === payload))
    state.mapTracks.splice(ind, 1)
  },
  changeTrack (state, payload) {
    const ind = state.mapTracks.indexOf(state.mapTracks.find(x => x.trackId === payload.id))
    state.mapTracks[ind] = payload.track
  },
}
