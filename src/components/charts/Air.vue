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
      arrayDati: []
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
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: 'MQ9',
            backgroundColor: '#FF7E79',
            data: this.arrayDati
          }
          // {
          //   label: 'PM10',
          //   backgroundColor: '#1AACFE',
          //   data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
          // }
        ]
      }
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
    archivioDati () {
      this.arrayDati.push(this.datiAria)
      if (this.arrayDati.length === 10) {
        this.arrayDati.shift()
      }
    }
  }
}
</script>

<style lang='sass' scoped>
.small
  max-width: 80vw
</style>
