<script>
import Layout from '@layouts/main'

export default {
  page: {
    title: 'redirect',
    meta: [{ name: 'description', content: 'redirect' }],
  },
  components: { Layout },
  data() {
    return {
      authorizationCode: '',
    }
  },
  mounted() {
    let params = new URLSearchParams(window.location.search)
    this.authorizationCode = params.get('code')
    localStorage.authorizationCode = params.get('code')
  },
}
</script>

<template>
  <Layout>
    <h1 :class="$style.title">
      Redirect
      <div v-if="authorizationCode">
        Got authorization code: {{ authorizationCode }}
      </div>
    </h1>
  </Layout>
</template>

<style lang="scss" module>
.title {
  text-align: center;
}
</style>
