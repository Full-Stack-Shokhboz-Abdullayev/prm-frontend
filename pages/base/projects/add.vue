<template>
  <div>
    <PageHeader :title="title + ' Qo\'shish'" :items="items" />

    <wizard-form
      :data="projectData"
      @complete="onSave"
      :saving-progress="saving"
      :placeholderPrefix="title"
    >
      <wizard-form-finish :dataBaseTitle="title" />
    </wizard-form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import projectBlueprint from "~/utils/data-blueprints/project.blueprint.js";
import savingAlert from "~/mixins/savingAlert.js";

export default {
  head() {
    return {
      title: `${this.title}`
    };
  },
  computed: {
    ...mapState("modules/cities.store", ["cities"]),
    ...mapGetters("modules/projects.store", ["GET_PROJECT_BY_ID"])
  },
  mixins: [savingAlert({ name: "base-projects" })],
  middleware: "router-auth",
  data() {
    return {
      title: "Loyiha",
      projectData: {},
      items: [],
      saving: false,
      editing: false,
      initialCityValue: 0
    };
  },
  mounted() {
    this.main();
  },
  methods: {
    ...mapActions("modules/projects.store", ["ADD_PROJECT", "UPDATE_PROJECT"]),
    main() {
      if (this.$route.query.editing_project_id) {
        this.editing = true;
        this.editingId = this.$route.query.editing_project_id;
      }
      this.setInitial();
    },
    setInitial() {
      this.projectData = projectBlueprint(this.cities);
      this.ifEditing();
    },
    ifEditing() {
      if (this.editing) {
        const scrape = editingProject => {
          const data = [];
          for (const tab of this.projectData) {
            const mTab = { ...tab };
            for (const field of mTab.fields) {
              let value = editingProject[field.key];
              if (field.key === "city") {
                value = value.id;
                this.initialCityValue = value.id;
              } else if (field.type === "date" && value) {
                const d = new Date(value);
                value = d;
              }
              field.value = value;
            }
            data.push(mTab);
          }
          this.projectData = data;
        };

        const { editing_project_id } = this.$route.query;

        setTimeout(() => {
          const editingProject = this.GET_PROJECT_BY_ID(
            new Number(editing_project_id)
          );
          scrape(editingProject);
        }, 0);
      }
    },
    async onSave() {
      this.saving = true;
      const success = await this.toDB();
      this.saving = false;
      this.fireSwal(success);
      if (success) {
        this.setInitial();
      }
    },
    async toDB() {
      const data = {};
      for (const tab of this.projectData) {
        for (const field of tab.fields) {
          const isDate =
            field.type === "date" &&
            field.value &&
            new String(field.value).split(" ").length > 0;

          if (field.type === "number") {
            data[field.key] = new Number(field.value);
          } else if (
            field.value ||
            (field.type === "select" &&
              (field.value || field.value === false)) ||
            isDate
          ) {
            data[field.key] = field.value;
          } else {
            data[field.key] = null;
          }
        }
      }

      return this.editing
        ? await this.UPDATE_PROJECT({
            id: this.editingId,
            data,
            isCityChanged: data.city !== this.initialCityValue
          })
        : await this.ADD_PROJECT(data);
    }
  }
};
</script>

<style></style>
