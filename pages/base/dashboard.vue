<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div
        v-for="data in widgetData"
        :key="data.title"
        class="col-xl-3 col-md-6"
      >
        <CrmWidget
          :title="data.title"
          :icon="data.icon"
          :value="data.value"
          :text="data.text"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-lg-4">
        <div class="card">
          <div class="card-body">
            <h4 class="header-title mb-4">
              Loyihalar statuslari bo'yicha diagramma
            </h4>

            <!-- PIE Chart -->
            <PieChart
              :label-data="projectStatuses"
              :background-colors="['#3bafda', '#1abc9c', '#f7b84b', '#DC143C']"
            />
          </div>
        </div>
      </div>

      <div class="col-lg-8">
        <div class="card">
          <div class="card-body">
            <h4 class="header-title mb-4">
              Shahar/Tumanlar aro loyihalar soni
            </h4>
            <!-- Bar Chart -->
            <BarChart
              item-label-key="title"
              item-data-key="projects_count"
              :dataset="cities"
              :bottom-labels="['Loyihalar Soni']"
              :height="350"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-8">
        <DataTable v-bind="projectsDataTable" stickyHeader />
      </div>
      <div class="col-lg-4">
        <DataTable v-bind="citiesDataTable" stickyHeader />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import statuses from "~/utils/data-blueprints/statuses.blueprint.js";

export default {
  head() {
    return {
      title: `${this.title} Dashboard | PRM - Loyihalar Monitoring Platformasi`
    };
  },
  computed: {
    ...mapState("modules/projects.store", ["projects"]),
    ...mapState("modules/cities.store", ["cities"]),
    ...mapGetters("modules/users.store", ["MODERATORS", "ADMINS"]),
    widgetData() {
      return [
        {
          title: "Shahar/Tumanlar",
          icon: "ri-map-pin-line",
          value: this.cities.length
        },
        {
          title: "Loyihalar",
          icon: "ri-pencil-ruler-2-line",
          value: this.projects.length
        },
        {
          title: "Moderatorlar",
          icon: "ri-account-pin-box-fill",
          value: this.MODERATORS.length
        },
        {
          title: "Adminlar",
          icon: "ri-account-circle-line",
          value: this.ADMINS.length
        }
      ];
    },

    projectsDataTable() {
      return {
        title: "Loyihalar",
        tableData: this.projects,
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
            label: "Tashkilot",
            key: "owner_company",
            sortable: true
          },
          {
            label: "Yo'nalishi",
            key: "direction",
            sortable: true
          },
          {
            label: "Shartnoma Raqami",
            key: "contract_number",
            sortable: true
          },
          {
            label: "Status",
            key: "status",
            sortable: false
          }
        ]
      };
    },
    projectStatuses() {
      const data = {
        Kutilmoqda: 0,
        "Ishga Tushgan": 0,
        Kechikmoqda: 0,
        "Bekor Qilingan": 0
      };
      this.setStatuses(data);

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
      title: "CRM",
      statuses,
      items: [
        {
          text: "Asosiy"
        },
        {
          text: "Panel"
        },
        {
          text: "CRM",
          active: true
        }
      ]
    };
  },
  methods: {
    setStatuses(statuses) {
      for (let index = 0; index < this.projects.length; index++) {
        statuses[this.projects[index].status]++;
      }
    }
  }
};
</script>
