<template>
  <div id="app">
    <bar-chart></bar-chart>
    <line-chart></line-chart>
  </div>
</template>

<script>
import BarChart from './charts/BarChart.vue'
import LineChart from "./CallAPI.vue"
export default {
  name: 'app',
  components: {
    "bar-chart": BarChart,
    "line-chart": LineChart
  }
}
</script>

<style>
</style>
