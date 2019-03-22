<script>
import LineChart from './LineChart.js'

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        scales: {
          xAxes: [
            {
              type: 'time',
              distribution: 'linear',
            },
          ],
        },
      },
    }
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
            x: Date.parse(entry.resource.effectiveDateTime),
            y: entry.resource.valueQuantity.value,
          }
        })
        .sort((a, b) => a.x - b.x)
      return points
    },
    systolicBloodPressureSeries() {
      if (!this.$store.state.auth.response) {
        return {}
      }
      const entries = this.$store.state.auth.response.data.entry
      let systolicPoints = entries
        .filter(
          (entry) => entry.resource.code.coding[0].display === 'Blood Pressure'
        )
        .map((entry) => {
          return {
            x: Date.parse(entry.resource.effectiveDateTime),
            y: entry.resource.component.filter(
              (point) => point.code.text === 'Systolic Blood Pressure'
            )[0].valueQuantity.value,
          }
        })
        .sort((a, b) => a.x - b.x)
      return systolicPoints
    },
    diastolicBloodPressureSeries() {
      if (!this.$store.state.auth.response) {
        return {}
      }
      const entries = this.$store.state.auth.response.data.entry
      let diastolicPoints = entries
        .filter(
          (entry) => entry.resource.code.coding[0].display === 'Blood Pressure'
        )
        .map((entry) => {
          return {
            x: Date.parse(entry.resource.effectiveDateTime),
            y: entry.resource.component.filter(
              (point) => point.code.text === 'Diastolic Blood Pressure'
            )[0].valueQuantity.value,
          }
        })
        .sort((a, b) => a.x - b.x)
      return diastolicPoints
    },
    bodyMassIndexSeries() {
      if (!this.$store.state.auth.response) {
        return {}
      }
      const entries = this.$store.state.auth.response.data.entry
      let points = entries
        .filter(
          (entry) => entry.resource.code.coding[0].display === 'Body Mass Index'
        )
        .map((entry) => {
          return {
            x: Date.parse(entry.resource.effectiveDateTime),
            y: entry.resource.valueQuantity.value,
          }
        })
        .sort((a, b) => a.x - b.x)
      return points
    },
    temperatureSeries() {
      if (!this.$store.state.auth.response) {
        return {}
      }
      const entries = this.$store.state.auth.response.data.entry
      let points = entries
        .filter(
          (entry) =>
            entry.resource.code.coding[0].display === 'Oral temperature'
        )
        .map((entry) => {
          return {
            x: Date.parse(entry.resource.effectiveDateTime),
            y: entry.resource.valueQuantity.value,
          }
        })
        .sort((a, b) => a.x - b.x)
      return points
    },
    dataSets() {
      const defaults = {
        fill: false,
        cubicInterpolationMode: 'monotone',
      }
      return {
        datasets: [
          {
            ...defaults,
            label: 'Body Weight',
            data: this.weightSeries,
            borderColor: 'red',
          },
          {
            ...defaults,
            label: 'Oral Temperature',
            data: this.temperatureSeries,
            borderColor: 'green',
          },
          {
            ...defaults,
            label: 'Body Mass Index',
            data: this.bodyMassIndexSeries,
            borderColor: 'yellow',
          },
          {
            ...defaults,
            label: 'Diastolic Blood Pressure',
            data: this.diastolicBloodPressureSeries,
            borderColor: 'steelblue',
          },
          {
            label: 'Systolic Blood Pressure',
            data: this.systolicBloodPressureSeries,
            backgroundColor: 'lightsteelblue',
            borderColor: 'PaleVioletRed',
            fill: '-1',
          },
        ],
      }
    },
  },
  methods: {},
}
</script>

<template>
  <LineChart :chart-data="dataSets" :options="chartOptions" />
</template>
