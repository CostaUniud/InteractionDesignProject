<template>
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
  </div>
</template>

<script>
import LineChart from './LineChart.js'
import { mapGetters } from 'vuex'

export default {
  components: {
    LineChart
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
        datasets: [
          {
            label: 'MQ9',
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
