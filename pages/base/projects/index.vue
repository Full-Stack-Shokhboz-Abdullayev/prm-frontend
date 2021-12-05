<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <div class="row mb-2">
      <div class="col-sm-7">
        <div class="d-flex align-items-center">
          <h4 class="text-dark mr-3">
            Maket ko'rinishi:
          </h4>
          <b-button-group>
            <b-button
              @click="changeView('card')"
              :variant="view === 'card' ? 'primary' : 'light'"
              ><i class="fe-layers"></i> Karta</b-button
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
      <div class="col-sm-5 add-btn-col d-flex">
        <div class="d-flex align-items-center flex-row-reverse w-100 flex-wrap">
          <nuxt-link v-if="hasAccess" :to="{ name: 'base-projects-add' }" class="btn btn-primary m-1"
            ><i class="mdi mdi-plus-circle mr-2"></i> Yangi Qo'shish</nuxt-link
          >
            <button class="btn btn-success m-1"
              @click="download"
              ><i class="mdi mdi-download mr-2"></i> Ma'lumotlarni Yuklab Olish</button
            >
          </div>
        </div>
    </div>
    <transition name="fade" mode="out-in">
      <CardGroup
        key="card-component-projects"
        :perPage="6"
        v-if="view === 'card'"
        :items="projects"
        v-slot:default="{ item }"
      >
        <b-card class="ribbon-box card--custom">
          <div :class="`ribbon ribbon-${statuses[item.status]} float-right`">
            <i class="mdi mdi-access-point mr-1"></i>
            {{ item.status }}
          </div>
          <b-card-title>
            <h4
              @click="showInfo(item.id)"
              class="text-dark card-title open-project"
              :id="'title' + item.id"
            >
              {{ item.title }}
            </h4>
            <b-tooltip :target="'title' + item.id" placement="left"
              >Ma'lumot</b-tooltip
            >
          </b-card-title>
          <h5 slot="header" class="mb-0">
            <span class="text-underline text-dark">{{
              item.owner_company
            }}</span>
            tashkiloti tomonidan.
          </h5>
          <b-card-text>
            <template v-for="field in cardFields">
              <p v-if="item[field.key]" :key="field.key + 'f'">
                {{ field.label }}:
                <span class="text-underline">
                  {{ item[field.key] }}
                </span>
              </p>
            </template>
          </b-card-text>
          <div
            v-if="hasAccess"
            class="d-flex position-absolute project-card-actions"
          >
            <b-button
              variant="success"
              @click="editProject(item.id)"
              class="mr-2"
              :id="'edit' + item.id"
            >
              <i class="fe-edit-1"></i>
            </b-button>
            <b-tooltip :target="'edit' + item.id" placement="bottom"
              >Tahrirlash</b-tooltip
            >
            <b-button
              variant="danger"
              :id="'delete' + item.id"
              @click="deleteProject(item.id)"
            >
              <i class="fe-delete align-middle"></i>
            </b-button>
            <b-tooltip :target="'delete' + item.id" placement="right"
              >O'chirish</b-tooltip
            >
          </div>
        </b-card>
      </CardGroup>
      <DataTable
        key="projecttable"
        v-else
        title="Loyihalar Jadval Ko'rinishida"
        :actions="hasAccess"
        :onEdit="editProject"
        :onDelete="deleteProject"
        v-bind="projectsDataTable"
      />
    </transition>

    <b-modal
      v-if="selectedProject"
      size="lg"
      id="modal"
      :title="'Loyiha: ' + selectedProject.title"
      title-class="font-18"
      ok-only
    >
      <template v-for="field in projectsDataTable.fields">
        <p
          v-if="
            ($options.filters.fetchKeys(selectedProject, field.key) ||
              selectedProject[field.key] === false) &&
              field.label
          "
          class="text-dark"
          :key="field.key + 'pr-view'"
        >
          <span class="h4 text-dark">{{ field.label }}:</span>
          <span class="text-underline text-dark h4">
            {{ selectedProject | fetchKeys(field.key) | formatFields(field) }}
          </span>
        </p>
      </template>
    </b-modal>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import { mapState, mapActions } from "vuex";
import permissionsMixin from "~/mixins/permissions.js";
import savingAlert from "~/mixins/savingAlert.js";
import statuses from "~/utils/data-blueprints/statuses.blueprint.js";
export default {
  head() {
    return {
      title: `${this.title}`
    };
  },
  mixins: [permissionsMixin, savingAlert({})],
  components: {
    Switches: () => import("vue-switches")
  },
  computed: {
    ...mapState("modules/projects.store", ["projects"]),

    selectedProject() {
      return this.projects[this.selectedIndex];
    },
    projectsDataTable() {
      return {
        tableData: this.projects,
        pageOptions: [10, 20, 30, 40, 50],
        sortBy: "title",
        filterOn: ["title"],
        fields: [
          { key: "id", thClass: "d-none", tdClass: "d-none" },
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
            label: "Tarmoq Yo'nalishi",
            key: "net_direction",
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
          },
          {
            label: "Rejadagi qiymati (mln so'm)",
            key: "value_in_plan",
            sortable: true
          },
          {
            label: "Amaldagi qiymati (mln so'm)",
            key: "value_in_practice",
            sortable: true
          },
          {
            label: "Rejadagi o'z sarmoyasi (mln so'm)",
            key: "financing_own_investment_in_plan",
            sortable: true
          },
          {
            label: "Amaldagi o'z sarmoyasi (mln so'm)",
            key: "financing_own_investment_in_practice",
            sortable: true
          },
          {
            label: "Rejadagi Bank sarmoyasi (mln so'm)",
            key: "financing_bank_in_plan",
            sortable: true
          },
          {
            label: "Amaldagi Bank sarmoyasi (mln so'm)",
            key: "financing_bank_in_practice",
            sortable: true
          },
          {
            label: "Rejadagi Xorijiy Bank sarmoyasi (ming dollar)",
            key: "financing_international_bank_in_plan",
            sortable: true
          },
          {
            label: "Amaldagi Xorijiy Bank sarmoyasi (ming dollar)",
            key: "financing_international_bank_in_practice",
            sortable: true
          },
          {
            label: "Rejadagi Xorijiy Investitsiya sarmoyasi (ming dollar)",
            key: "financing_international_investment_in_plan",
            sortable: true
          },
          {
            label: "Amaldagi Xorijiy Investitsiya sarmoyasi (ming dollar)",
            key: "financing_international_investment_in_practice",
            sortable: true
          },
          {
            label: "Rejadagi Ish o'rinlari",
            key: "workplaces_in_plan",
            sortable: true
          },
          {
            label: "Amaldagi Ish o'rinlari",
            key: "workplaces_in_practice",
            sortable: true
          },
          {
            label: "RIP 459",
            key: "rip_459",
            formatter: val => this.boolFormatter(val, ["Bor", "Yo'q"]),
            sortable: true
          },
          {
            label: "Ishga tushganligi",
            key: "in_production",
            formatter: val => this.boolFormatter(val, ["Ha", "Yo'q"]),
            sortable: true
          },
          {
            label: "Ishga tushmaslik xavfi",
            key: "danger_of_cancellation",
            formatter: val => this.boolFormatter(val, ["Bor", "Yo'q"]),
            sortable: true
          },
          {
            label: "Bekor Qilingan",
            key: "cancelled",
            formatter: val => this.boolFormatter(val, ["Ha", "Yo'q"]),
            sortable: true
          },
          {
            label: "O'zlashtirilgan",
            key: "owned",
            formatter: val => this.boolFormatter(val, ["Ha", "Yo'q"]),
            sortable: true
          },
          {
            label: "Shahar/Tuman",
            key: "city.title"
          },
          {
            label: "Xizmat ko'rsatuvchi bank",
            key: "serving_bank",
            sortable: true
          },
          {
            label: "Rejadagi Ishga tushish vaqti",
            key: "start_date_in_plan",
            formatter: this.dateFormatter,
            sortable: true
          },
          {
            label: "Amaldagi Ishga tushish vaqti",
            key: "start_date_in_practice",
            formatter: this.dateFormatter,
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
      view: "card",
      statuses,
      items: [
        {
          text: "Asosiy"
        },
        {
          text: "Loyihalar"
        },
        {
          text: "Baza",
          active: true
        }
      ],
      cardFields: [
        {
          label: "Yo'nalishi",
          key: "direction",
          sortable: true
        },
        {
          label: "Tarmoq Yo'nalishi",
          key: "net_direction",
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
  methods: {
    ...mapActions("modules/projects.store", ["DELETE_PROJECT"]),
    async deleteProject(id) {
      const result = await this.sure();
      if (result.isConfirmed) {
        await this.DELETE_PROJECT(id);
        Swal.fire("O'chirildi!", "Muvaffaqiyatli o'chirildi.", "success");
      }
    },
    editProject(id) {
      this.$router.push({
        name: "base-projects-add",
        query: { editing_project_id: id }
      });
    },
    changeView(val) {
      this.view = val;
    },
    showInfo(id) {
      this.selectedIndex = this.projects.findIndex(item => item.id === id);
      this.$bvModal.show("modal");
    },
    boolFormatter(value, [ifTrue, ifFalse]) {
      return value ? ifTrue : ifFalse;
    },
    dateFormatter(value) {
      let d = "";
      if (value) {
        d = new Date(value).toLocaleDateString("uz-Cyrl-UZ");
      }
      return d;
    },
    isDate(date) {
      return new Date(date) !== "Invalid Date" && !isNaN(new Date(date));
    },
    download() {
      this.$axios({
        url: "http://165.22.27.188:5000/api/projects/download",
        method: "GET",
        responseType: "blob"
      }).then(response => {
        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        const fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute("download", "loyihalar.xlsx");
        document.body.appendChild(fileLink);

        fileLink.click();
      });
    }
  },
  filters: {
    formatFields(data, field) {
      return field.formatter ? field.formatter(data) : data;
    },
    fetchKeys(obj, keys) {
      const arr = keys.split(".");

      while (arr.length && (obj = obj[arr.shift()]));
      return obj;
    }
  }
};
</script>
