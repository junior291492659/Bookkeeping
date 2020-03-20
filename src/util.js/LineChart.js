import { Bar} from 'vue-chartjs'

export default {
  extends: Bar,
  props: {
    chartData: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  // props: ["chartData", "options"],
  mounted () {
    console.log("in chartjs mounted");
    this.renderChart(this.chartData, this.options)
  }
}