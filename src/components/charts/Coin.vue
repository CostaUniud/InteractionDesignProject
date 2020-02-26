<template>
  <div class="small">
    <pie-chart :chart-data="datacollection"></pie-chart>
    <!-- <button @click="fillData()">Randomize</button> -->
  </div>
</template>

<script>
import PieChart from './PieChart.js'

export default {
  components: {
    PieChart
  },
  data () {
    return {
      datacollection: {}
    }
  },
  mounted () {
    this.fillData()
  },
  methods: {
    fillData () {
      this.datacollection = {
        labels: ['Aria', 'Mobilità', 'Verde', 'Energia'],
        datasets: [
          {
            backgroundColor: ['#2B86DB', '#FF7E79', '#319B62', '#F2C94C'],
            data: [10, 20, 30, 40]
          }
        ]
      }
    }
  }
}
</script>

<style lang='sass' scoped>
.small
  width: 200px
</style>
