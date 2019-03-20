import axios from 'axios'

export const state = {
  clientId: 'default_client_id',
  clientSecret: '',
  serviceUrl: 'http://launch.smarthealthit.org/v/r2/sim/eyJoIjoiMSJ9/fhir',
  authUrl: '',
  tokenUrl: '',
  authorizationCode: '',
  accessToken: '',
  patientId: 'smart-1137192',
  response: '',
  endpoints: {
    test: 'https://r2.smarthealthit.org',
    smart: 'http://launch.smarthealthit.org/v/r2/sim/eyJoIjoiMSJ9/fhir',
    epic: 'https://open-ic.epic.com/argonaut/api/FHIR/Argonaut/',
  },
}

axios.defaults.baseURL = state.serviceUrl

export const mutations = {
  SET_CLIENT_ID(state, newValue) {
    state.clientId = newValue
  },
  SET_CLIENT_SECRET(state, newValue) {
    state.clientSecret = newValue
  },
  SET_AUTH_URL(state, newValue) {
    state.authUrl = newValue
  },
  SET_TOKEN_URL(state, newValue) {
    state.tokenUrl = newValue
  },
  SET_ACCESS_TOKEN(state, newValue) {
    state.accessToken = newValue
  },
  SET_AUTHORIZATION_CODE(state, newValue) {
    state.authorizationCode = newValue
  },
  SET_PATIENT_ID(state, newValue) {
    state.patientId = newValue
  },
  SET_SERVICE_URL(state, newValue) {
    state.serviceUrl = newValue
    axios.defaults.baseURL = state.serviceUrl
  },
  SET_RESPONSE(state, newValue) {
    state.response = newValue
  },
}

export const getters = {}

export const actions = {
  init() {
    let self = this
    this.watch(
      () => {
        return localStorage.authorizationCode
      },
      () => {
        return self.commit(
          'SET_AUTHORIZATION_CODE',
          localStorage.authorizationCode
        )
      }
    )
  },
  testCall({ state, commit }) {
    axios
      .get(`/Observation?category=vital-signs&patient=${state.patientId}`, {
        headers: {
          Authorization: `Bearer ${state.accessToken}`,
        },
      })
      .then((response) => {
        commit('SET_RESPONSE', response)
      })
      .catch((error) => {
        commit('SET_RESPONSE', error)
      })
  },
  oauth({ state, commit }) {
    axios
      .get('/metadata', {
        headers: {
          Accept: 'application/json+fhir',
        },
      })
      .then((response) => {
        commit(
          'SET_AUTH_URL',
          response.data.rest[0].security.extension[0].extension[0]['valueUri']
        )
        commit(
          'SET_TOKEN_URL',
          response.data.rest[0].security.extension[0].extension[1]['valueUri']
        )
      })
  },
  authorization({ state, commit }) {
    const params = {
      response_type: 'code',
      client_id: state.clientId,
      redirect_uri: 'localhost:8080/redirect',
      scope: 'launch/patient patient/*.read',
      state: 'uniqueHash',
      aud: state.serviceUrl,
    }

    window.open(
      axios.getUri({
        url: state.authUrl,
        params,
      })
    )
  },
  token({ state, commit }) {
    const tokenRequest = {
      grant_type: 'authorization_code',
      code: state.authorizationCode,
      redirect_uri: 'localhost:8080/redirect',
      client_id: state.clientId,
    }
    axios
      .get(state.tokenUrl, {
        params: tokenRequest,
      })
      .then((response) => {
        commit('SET_ACCESS_TOKEN', response.data.access_token)
        commit('SET_PATIENT_ID', response.data.patient)
      })
  },
}
