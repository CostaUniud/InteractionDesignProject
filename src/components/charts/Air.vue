<template>
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
    <!-- <button @click="fillData()">Randomize</button> -->
  </div>
</template>

<script>
import LineChart from './LineChart.js'

export default {
  components: {
    LineChart
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
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: 'PM2.5',
            backgroundColor: '#FF7E79',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
          },
          {
            label: 'PM10',
            backgroundColor: '#1AACFE',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
          }
        ]
      }
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }
}
</script>

<style lang='sass' scoped>
.small
  max-width: 80vw
  // height: 40vh
  // margin:  150px auto
</style>
