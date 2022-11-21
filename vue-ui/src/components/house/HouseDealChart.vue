<script>
import { Line } from "vue-chartjs";
import { mapState } from "vuex";

const houseStore = "houseStore";

export default {
  extends: Line,
  data() {
    return {
      datacollection: {
        labels: [],
        datasets: [
          {
            label: "가격 변동",
            data: [],
            borderColor: ["rgba(255,99,132,1)"],
            borderWidth: 1,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
        },
        legend: {
          display: true,
        },
        elements: {
          point: {
            radius: 5,
          },
        },
      },
    };
  },
  created() {
    this.housedeals.forEach((deal) => {
      this.datacollection.labels.push(`${deal.year}.${deal.month}`);
      this.datacollection.datasets[0].data.push(deal.dealAmount);
    });
  },
  mounted() {
    this.renderChart(this.datacollection, this.options);
  },
  computed: {
    ...mapState(houseStore, ["housedeals"]),
  },
};
</script>
