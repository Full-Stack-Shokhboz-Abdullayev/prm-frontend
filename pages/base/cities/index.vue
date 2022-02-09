<template>
  <div>
    <PageHeader :title="title" :items="items" />

    <div class="row mb-2">
      <div class="col-sm-8">
        <div class="d-flex align-items-center">
          <h4 class="text-dark mr-3">
            Maket ko'rinishi:
          </h4>
          <b-button-group>
            <b-button
              @click="changeView('diagramm')"
              :variant="view === 'diagramm' ? 'primary' : 'light'"
              ><i class="fe-layers"></i> Diagramma</b-button
            >
            <b-button
              @click="changeView('table')"
              :variant="view === 'table' ? 'primary' : 'light'"
            >
              <i class="fe-layout"></i>
              Jadval</b-button
            >
          </b-button-group>
        </div>
      </div>
      <div class="col-sm-4 add-btn-col" v-if="hasAccess">
        <div class="float-sm-right d-flex align-items-center">
          <nuxt-link :to="{ name: 'base-cities-add' }" class="btn btn-primary"
            ><i class="mdi mdi-plus-circle mr-2"></i> Yangi Qo'shish</nuxt-link
          >
        </div>
      </div>
    </div>
    <br />
    <transition name="fade" mode="out-in">
      <div v-if="view === 'diagramm'" class="row">
        <div class="col-lg-4">
          <div class="card">
            <div class="card-body">
              <h4 class="header-title mb-4">
                Shahar/Tumanlar aro mavjud Loyihalar ko'rsatkichi
              </h4>

              <!-- PIE Chart -->
              <pie-chart key="" :label-data="citiesPieChartData" />
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="card">
            <div class="card-body">
              <h4 class="header-title mb-4">
                Shahar/Tumanlar aro mavjud Loyihalar ko'rsatkichi
              </h4>

              <!-- PIE Chart -->
              <bar-chart :dataset="cities" :customDataMapper="mapper" />
            </div>
          </div>
        </div>
      </div>

      <DataTable
        key="citytable"
        v-bind="citiesDataTable"
        :actions="hasAccess"
        :onEdit="editCity"
        :onDelete="deleteCity"
        v-else
        title="Shahar/Tumanlar Jadval Ko'rinishida"
      />
    </transition>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import { mapState, mapActions } from "vuex";
import permissionsMixin from "~/mixins/permissions.js";
import statuses from "~/utils/data-blueprints/statuses.blueprint.js";

// 2 modes: charts, table
// - Charts
//    - render Piechart simple,
//    - render Barchart in 4 statuses:
//        bottom labels 4 statuses
//        in each label there are all cities
//        can exclude those cities from chart

export default {
  head() {
    return {
      title: `${this.title}`
    };
  },
  mixins: [permissionsMixin],

  computed: {
    ...mapState("modules/cities.store", ["cities"]),
    ...mapState("modules/projects.store", ["projects"]),
    citiesPieChartData() {
      const data = {};
      for (let i of this.cities) {
        data[i.title] = i.projects_count;
      }
      return data;
    },
    citiesDataTable() {
      return {
        title: "Shahar/Tumanlar",
        tableData: this.cities,
        pageOptions: [5, 10],
        sortBy: "title",
        filterOn: ["title"],
        fields: [
          {
            label: "Nomi",
            key: "title",
            sortable: true
          },
          {
            label: "Loyihalar Soni",
            key: "projects_count",
            sortable: true
          }
        ]
      };
    }
  },
  data() {
    return {
      selectedIndex: 0,
      title: "Loyihalar Bazasi",
      view: "diagramm",
      statuses,
      items: [
        {
          text: "Asosiy"
        },
        {
          text: "Shahar/Tumanlar"
        },
        {
          text: "Baza",
          active: true
        }
      ]
    };
  },
  methods: {
    ...mapActions("modules/cities.store", ["DELETE_CITY"]),
    async deleteCity(id) {
      const result = await Swal.fire({
        title: "Ishonchingiz Komilmi?",
        text: "Buni ortga qaytarib bo'lmaydi!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ha, o'chirish",
        cancelButtonText: "Yo'q, bekor qilish",
        reverseButtons: true
      });
      if (result.isConfirmed) {
        await this.DELETE_CITY(id);
        Swal.fire("O'chirildi!", "Muvaffaqiyatli o'chirildi.", "success");
      }
    },
    editCity(id) {
      this.$router.push({
        name: "base-cities-add",
        query: { editing_city_id: id }
      });
    },
    changeView(val) {
      this.view = val;
    },
    mapper(dataset, props) {
      return dataset.flatMap((city, index) => {
        const data = props.bottomLabels.map(
          statusItem =>
            this.projects.filter(
              project =>
                project.status === statusItem &&
                project.city.title === city.title
            ).length
        );
        return data.every(item => item === 0)
          ? []
          : [
              {
                label: city.title,
                backgroundColor: props.colors[index],
                borderColor: props.colors[index],
                minBarLength: 6,
                hoverBackgroundColor: props.colors[index],
                hoverBorderColor: props.colors[index],
                data
              }
            ];
      });
    }
  }
};
</script>
