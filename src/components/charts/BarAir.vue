<template>
  <div class="small">
    <bar-chart :chart-data="datacollection"></bar-chart>
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
      arrayData: []
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
  watch: {
    datiAria: function () {
      this.arrayData.push(parseInt(this.datiAria))
      if (this.arrayData.length === 10) {
        this.arrayData.shift()
      }
      this.fillData()
    }
  },
  methods: {
    fillData () {
      this.datacollection = {
        labels: ['CO'],
        datasets: [
          {
            // barPercentage: 0.5,
            // barThickness: 6,
            // maxBarThickness: 8,
            // minBarLength: 2,
            label: 'CO',
            backgroundColor: '#FF7E79',
            data: this.arrayData
          }
          // {
          //   label: 'PM10',
          //   backgroundColor: '#1AACFE',
          //   data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
          // }
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
