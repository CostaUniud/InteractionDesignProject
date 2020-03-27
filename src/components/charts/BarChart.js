import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: ['options'],
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  }
  // methods: {
  //   update () {
  //     this.$data._chart.update()
  //   }
  // }
  // watch: {
  //   chartData () {
  //     this.$data._chart.update()
  //   }
  // }
}
