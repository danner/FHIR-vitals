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
    clientId: {
      set(clientId) {
        this.$store.commit('auth/SET_CLIENT_ID', clientId)
      },
      get() {
        return this.$store.state.auth.clientId
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
      <v-form id="fhir-response-form" @submit.prevent="testCall">
        FHIR Response
        <v-text-field
          v-model="serviceUrl"
          name="serviceUrl"
          label="FHIR Service URL"
        ></v-text-field>
        <v-text-field
          v-model="clientId"
          name="clientId"
          label="Client ID"
        ></v-text-field>
        <v-btn type="submit" form="fhir-response-form">
          Get Response
        </v-btn>
      </v-form>

      Response: {{ response }}
    </v-layout>
  </Layout>
</template>
