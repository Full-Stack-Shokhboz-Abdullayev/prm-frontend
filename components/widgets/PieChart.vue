<script>
import { Pie } from "vue-chartjs";
import colors from "~/utils/data-blueprints/colors.blueprint.js";
export default {
  extends: Pie,
  methods: {
    render() {
      this.$emit("beforeRender");
      this.renderChart(
        {
          labels: Object.keys(this.labelData),
          datasets: [
            {
              data: Object.values(this.labelData),
              backgroundColor: this.backgroundColors,
              borderColor: "transparent"
            }
          ]
        },
        this.chartStyles
      );
    }
  },
  computed: {
    chartStyles() {
      const fontColor = this.$themeManager.theme === "dark" ? "white" : "black";

      return {
        maintainAspectRatio: true,
        responsive: true,
        legend: {
          display: true,
          labels: {
            fontColor
          }
        }
      };
    }
  },
  props: {
    labelData: Object,
    backgroundColors: { type: Array, default: () => colors }
  },
  watch: {
    labelData() {
      this.render();
    },
    "$themeManager.theme"() {
      this.render();
    }
  },
  mounted() {
    this.render();
  }
};
</script>
