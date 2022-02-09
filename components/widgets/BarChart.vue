<script>
import { Bar } from "vue-chartjs";
import colors from "~/utils/data-blueprints/colors.blueprint.js";
import statuses from "~/utils/data-blueprints/statuses.blueprint.js";

export default {
  extends: Bar,
  props: {
    dataset: Array,
    colors: { type: Array, default: () => colors },
    bottomLabels: { type: Array, default: () => Object.keys(statuses) },
    itemLabelKey: { type: String },
    itemDataKey: { type: String },
    customDataMapper: Function
  },
  computed: {
    chartStyles() {
      const fontColor = this.$themeManager.theme === "dark" ? "white" : "black";
      return {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
          labels: {
            fontColor
          }
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                display: false
              },
              stacked: false,
              ticks: {
                stepSize: 10,
                fontColor,
                beginAtZero: true
              }
            }
          ],
          xAxes: [
            {
              stacked: false,
              gridLines: {
                color: "rgba(250,250,250,0.1)"
              },
              ticks: {
                fontColor
              }
            }
          ]
        }
      };
    }
  },
  methods: {
    render() {
      this.renderChart(
        {
          labels: this.bottomLabels,
          datasets: this.customDataMapper
            ? this.customDataMapper(this.dataset, this)
            : this.dataset.flatMap((item, index) => {
                return item[this.itemDataKey] > 0
                  ? [
                      {
                        label: item[this.itemLabelKey],
                        backgroundColor: this.colors[index],
                        borderColor: this.colors[index],
                        hoverBackgroundColor: this.colors[index],
                        hoverBorderColor: this.colors[index],
                        data: [item[this.itemDataKey]]
                      }
                    ]
                  : [];
              })
        },
        this.chartStyles
      );
    }
  },
  mounted() {
    this.render();
  },
  watch: {
    dataset: {
      handler() {
        this.render();
      }
    },
    "$themeManager.theme"() {
      this.render();
    }
  }
};
</script>
