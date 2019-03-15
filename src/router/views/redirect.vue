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
      message: window.location.search,
    }
  },
}
</script>

<template>
  <Layout>
    <h1 :class="$style.title">
      Redirect
      <template v-if="message">
        {{ message }}
      </template>
    </h1>
  </Layout>
</template>

<style lang="scss" module>
.title {
  text-align: center;
}
</style>
