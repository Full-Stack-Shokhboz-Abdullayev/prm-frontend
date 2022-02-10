<template>
  <div>
    <PageHeader :title="title + ' Qo\'shish'" :items="items" />

    <wizard-form
      :placeholderPrefix="title"
      :data="userData"
      @complete="onSave"
      :saving-progress="saving"
    >
      <wizard-form-finish :dataBaseTitle="title" />
    </wizard-form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import savingAlert from "~/mixins/savingAlert.js";

export default {
  mixins: [savingAlert({ name: "base-users" })],
  computed: {
    ...mapState("modules/cities.store", ["cities"]),
    ...mapState("modules/auth.store", ["user"]),
    ...mapGetters("modules/users.store", ["GET_USER_BY_ID"]),
    ...mapGetters("modules/cities.store", ["GET_CITY_BY_ID"])
  },
  middleware: "router-admin",
  data() {
    return {
      title: "Admin/Moderator",
      userData: {},
      items: [],
      saving: false,
      editing: false,
      initialCityValue: 0
    };
  },
  mounted() {
    if (this.$route.query.editing_user_id) {
      this.editing = true;
      this.editingId = +this.$route.query.editing_user_id;
    }
    this.setInitial();
  },
  methods: {
    ...mapActions("modules/users.store", ["ADD_USER", "UPDATE_USER"]),
    setInitial() {
      this.userData = [
        {
          required: true,
          title: "Majburiy Ma'lumotlar",
          icon: "",
          fields: [
            {
              label: "F.I.SH ",
              key: "name",
              value: ""
            },
            {
              label: "Email Pochta",
              key: "email",
              value: ""
            },
            {
              label: "Parol",
              key: "_password",
              value: ""
            },
            {
              label: "O'rni",
              type: "select",
              value: "moderator",
              options: [
                {
                  label: "Moderator",
                  value: "moderator"
                },
                {
                  label: "Admin",
                  value: "admin"
                }
              ],
              key: "role"
            },
            {
              label: "Shahar/Tuman",
              type: "select",
              value: this.GET_CITY_BY_ID(this.user.cityId),
              options: this.cities.map(city => ({
                label: city.title,
                value: city.id
              })),
              key: "city"
            }
          ]
        }
      ];
      this.ifEditing();
    },
    ifEditing() {
      if (this.editing) {
        const scrape = user => {
          const data = [];
          const fields = this.userData[0].fields;
          for (let index = 0; index < fields.length; index++) {
            const value = user[fields[index].key];
            const d = {
              ...fields[index],
              value: value?.id ? value.id : value
            };
            data.push(d);
          }
          this.userData[0].fields = data;
        };

        setTimeout(() => {
          const editingUser = this.GET_USER_BY_ID(this.editingId);
          if (!editingUser || editingUser.role === "admin") {
            this.$router.push({ name: "base-users" });
          }
          scrape(editingUser);
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
      for (const field of this.userData[0].fields) {
        if (field.value) {
          data[field.key] = field.value;
        }
      }
      return this.editing
        ? await this.UPDATE_USER({
            id: this.editingId,
            data,
            isCityChanged: data.city.id !== this.initialCityValue
          })
        : await this.ADD_USER(data);
    }
  }
};
</script>

<style></style>
