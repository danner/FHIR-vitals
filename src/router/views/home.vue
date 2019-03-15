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

      Response: {{ oauth }}
    </v-layout>
    <v-layout row wrap>
      <v-form id="fhir-response-form" @submit.prevent="testCall">
        Authentication
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
        <v-btn type="submit" form="fhir-response-form">
          Get Access Token
        </v-btn>
      </v-form>

      Response: {{ token }}
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
