import { Bar, Doughnut, Pie } from 'vue-chartjs'

export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: ['January', 'February', 'March', 'Aprail', 'may'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 52, 0,40, 0, 0]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  mounted(){
    this.renderChart(this.chartdata, this.options)
  }
}