<template>
  <div class="small">
    <bar-chart v-if="loaded" ref="barChart" :chart-data="datacollection" :options="chartOptions"></bar-chart>
  </div>
</template>

<script>
import { connect } from 'mqtt'
import BarChart from './BarChart.js'
import { mapGetters, mapActions } from 'vuex'

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
      },
      loaded: false
    }
  },
  mounted () {
    this.fetch()
  },
  computed: {
    ...mapGetters({
      'datiAria': 'aria/getAria'
    })
  },
  methods: {
    ...mapActions({
      'ottieniDatiAria': 'aria/fetch'
    }),
    fillData (co) {
      // await this.ottieniDatiAria()
      //   .then(response => {
      this.loaded = true
      this.datacollection = {
        labels: ['PM2.5', 'PM10', 'CO', 'NO2', 'NH3'],
        datasets: [
          {
            backgroundColor: ['#FF7E79', '#F2C94C', '#F2994A', '#2B86DB', '#319B62'],
            data: [55, 68, co, 34, 58]
          }
        ]
      }
      // this.$refs.barChart.update()
      // })
    },
    fetch (context) {
      var that = this
      return new Promise((resolve, reject) => {
        let client = connect('wss://192.168.137.71:8883')
        client.subscribe('air')
        client.on('message', function (topic, message) {
          that.fillData(message.toString())
          resolve(true)
        })
        client.on('error', function (error) {
          console.log('Cant connect' + error)
          // client.end()
          reject(error)
        })
      })
    }
  }
}
</script>

<style lang='sass' scoped>
.small
  max-width: 80vw
</style>
