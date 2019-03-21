<script>
import LineChart from './LineChart.js'

export default {
  components: {
    LineChart,
  },
  computed: {
    weightSeries() {
      if (!this.$store.state.auth.response) {
        return {}
      }
      const entries = this.$store.state.auth.response.data.entry
      let points = entries
        .filter(
          (entry) => entry.resource.code.coding[0].display === 'Body Weight'
        )
        .map((entry) => {
          return {
            x: Date(entry.resource.effectiveDateTime),
            y: entry.resource.valueQuantity.value,
          }
        })
        .sort((a, b) => a.x - b.x)
      return points
    },
    bloodPressureSeries() {
      return []
    },
    bodyMassIndexSeries() {
      return []
    },
    temperatureSeries() {
      return []
    },
    dataSets() {
      return {
        datasets: [
          {
            label: 'Body Weight',
            data: this.weightSeries,
          },
        ],
      }
    },
  },
  methods: {},
}
</script>

<template>
  <LineChart :chart-data="dataSets" :options="{ responsive: true }" />
</template>
