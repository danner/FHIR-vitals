<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import { authMethods } from '@state/helpers'

export default {
  page: {
    title: 'Home',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout },
  computed: {
    clientId: {
      set(clientId) {
        this.$store.commit('auth/SET_CLIENT_ID', clientId)
      },
      get() {
        return this.$store.state.auth.clientId
      },
    },
    clientSecret: {
      set(clientSecret) {
        this.$store.commit('auth/SET_CLIENT_SECRET', clientSecret)
      },
      get() {
        return this.$store.state.auth.clientSecret
      },
    },
    authUrl: {
      set(authUrl) {
        this.$store.commit('auth/SET_AUTH_URL', authUrl)
      },
      get() {
        return this.$store.state.auth.authUrl
      },
    },
    tokenUrl: {
      set(tokenUrl) {
        this.$store.commit('auth/SET_TOKEN_URL', tokenUrl)
      },
      get() {
        return this.$store.state.auth.tokenUrl
      },
    },
    authorizationCode: {
      set(authorizationCode) {
        this.$store.commit('auth/SET_AUTHORIZATION_CODE', authorizationCode)
      },
      get() {
        return this.$store.state.auth.authorizationCode
      },
    },
    accessToken: {
      set(accessToken) {
        this.$store.commit('auth/SET_ACCESS_TOKEN', accessToken)
      },
      get() {
        return this.$store.state.auth.accessToken
      },
    },
    serviceUrl: {
      set(serviceUrl) {
        this.$store.commit('auth/SET_SERVICE_URL', serviceUrl)
      },
      get() {
        return this.$store.state.auth.serviceUrl
      },
    },
    patientId: {
      set(patientId) {
        this.$store.commit('auth/SET_CLIENT_ID', patientId)
      },
      get() {
        return this.$store.state.auth.patientId
      },
    },
    response() {
      return this.$store.state.auth.response
    },
  },
  mounted() {
    let self = this
    this.authorizationCode = localStorage.authorizationCode
    this.$watch(
      () => localStorage.authorizationCode,
      (newVal, oldVal) => {
        self.authorizationCode = newVal
      }
    )
  },
  methods: {
    ...authMethods,
  },
}
</script>

<template>
  <Layout>
    <h1>Home Page</h1>
    <v-layout row wrap>
      <v-form id="oauth-form" @submit.prevent="oauth">
        Oauth
        <v-text-field
          v-model="serviceUrl"
          name="serviceUrl"
          label="FHIR Service URL"
        ></v-text-field>
        <v-text-field
          v-model="patientId"
          name="patientId"
          label="Client ID"
        ></v-text-field>
        <v-btn type="submit" form="oauth-form">
          Get Oauth
        </v-btn>
      </v-form>
    </v-layout>
    <v-layout row wrap>
      <v-form id="authorization-form" @submit.prevent="authorization">
        Authentication
        <v-text-field
          v-model="authUrl"
          name="authUrl"
          label="Authorization URL"
        ></v-text-field>
        <v-text-field
          v-model="clientId"
          name="clientId"
          label="Client ID"
        ></v-text-field>
        <v-btn type="submit" form="authorization-form">
          Get Authentication Code
        </v-btn>
      </v-form>
    </v-layout>
    <v-layout row wrap>
      <v-form id="token-form" @submit.prevent="token">
        Access Token
        <v-text-field
          v-model="tokenUrl"
          name="tokenUrl"
          label="Token URL"
        ></v-text-field>
        <v-text-field
          v-model="authorizationCode"
          name="authorizationCode"
          label="Authorization Code"
        ></v-text-field>
        <v-btn type="submit" form="token-form">
          Get Access Token
        </v-btn>
      </v-form>

      Access Token: {{ accessToken }}
    </v-layout>
    <v-layout row wrap>
      <v-form id="fhir-response-form" @submit.prevent="testCall">
        FHIR Response
        <v-text-field
          v-model="serviceUrl"
          name="serviceUrl"
          label="FHIR Service URL"
        ></v-text-field>
        <v-text-field
          v-model="accessToken"
          name="accessToken"
          label="Access Token"
        ></v-text-field>
        <v-text-field
          v-model="patientId"
          name="patientId"
          label="Patient ID"
        ></v-text-field>
        <v-btn type="submit" form="fhir-response-form">
          Get Response
        </v-btn>
      </v-form>

      Response: {{ response }}
    </v-layout>
  </Layout>
</template>
