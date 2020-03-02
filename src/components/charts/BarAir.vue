<template>
  <div class="small">
    <bar-chart :chart-data="datacollection" :options="chartOptions"></bar-chart>
  </div>
</template>

<script>
import BarChart from './BarChart.js'
import { mapGetters } from 'vuex'

export default {
  components: {
    BarChart
  },
  data () {
    return {
      datacollection: {},
      arrayData: [],
      chartOptions: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Qualità dell\'aria'
        }
      }
    }
  },
  mounted () {
    this.fillData()
  },
  computed: {
    ...mapGetters({
      'datiAria': 'aria/getAria'
    })
  },
  methods: {
    fillData () {
      this.datacollection = {
        labels: ['PM2.5', 'PM10', 'CO', 'NO2', 'NH3'],
        datasets: [
          {
            backgroundColor: ['#FF7E79', '#F2C94C', '#F2994A', '#2B86DB', '#319B62'],
            data: [55, 68, 40, 34, 58] // parseInt(this.datiAria)
          }
        ]
      }
    }
  }
}
</script>

<style lang='sass' scoped>
.small
  max-width: 80vw
</style>
