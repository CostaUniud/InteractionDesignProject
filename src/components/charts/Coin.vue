<template>
  <div class="small">
    <pie-chart :chart-data="datacollection"></pie-chart>
  </div>
</template>

<script>
import PieChart from './PieChart.js'
import { getCoinAria } from '@/utils/bt.js'

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
      if (getCoinAria() !== null) {
        console.log(getCoinAria())
        let aria = Math.round(getCoinAria() * 100) / 100
        this.datacollection = {
          labels: ['Aria', 'Mobilità', 'Verde', 'Energia'],
          datasets: [
            {
              backgroundColor: ['#2B86DB', '#FF7E79', '#319B62', '#F2C94C'],
              data: [aria, 0, 0, 0]
            }
          ]
        }
      } else {
        this.datacollection = {
          labels: ['VYoin'],
          datasets: [
            {
              backgroundColor: ['#919191'],
              data: [1]
            }
          ]
        }
      }
    }
  }
}
</script>

<style lang='sass' scoped>
.small
  width: 200px
</style>
