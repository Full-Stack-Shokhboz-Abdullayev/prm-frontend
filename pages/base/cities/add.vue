<template>
  <div>
    <PageHeader :title="title + ' Qo\'shish'" :items="items" />

    <wizard-form :data="cityData" @complete="onSave" :saving-progress="saving"
      :placeholderPrefix="title"
    >
      <wizard-form-finish :dataBaseTitle="title" />
    </wizard-form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import savingAlert from "~/mixins/savingAlert.js";

export default {

  mixins: [savingAlert({ name: "base-cities" })],
  computed: {
    ...mapState("modules/cities.store", ["cities"]),
    ...mapGetters("modules/cities.store", ["GET_CITY_BY_ID"])
  },
  middleware: "router-auth",
  data() {
    return {
      title: "Shahar/Tuman",
      cityData: {},
      items: [],
      saving: false,
      editing: false
    };
  },
  mounted() {
    if (this.$route.query.editing_city_id) {
      this.editingId = this.$route.query.editing_city_id;
      this.editing = true;
    }
    this.setInitial();
  },
  methods: {
    ...mapActions("modules/cities.store", ["ADD_CITY", "UPDATE_CITY"]),
    setInitial() {
      this.cityData = [
        {
          required: true,
          title: "Majburiy Ma'lumotlar",
          icon: "",
          fields: [
            {
              label: "Shahar/Tuman Nomi",
              key: "title",
              value: ""
            }
          ]
        }
      ];
      this.ifEditing();
    },
    ifEditing() {
      if (this.editing) {
        const scrape = city => {
          this.cityData[0].fields[0].value = city.title;
        };
        setTimeout(() => {
          const editingCity = this.GET_CITY_BY_ID(new Number(this.editingId));
          scrape(editingCity);
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
      const data = {
        title: this.cityData[0].fields[0].value
      };
      return this.editing
        ? await this.UPDATE_CITY({
            id: this.editingId,
            data
          })
        : await this.ADD_CITY(data);
    }
  }
};
</script>

<style></style>
