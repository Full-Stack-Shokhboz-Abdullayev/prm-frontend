<template>
  <div>
    <PageHeader :title="title" :items="items" />

    <div class="row mb-2">
      <div class="col-sm-12 add-btn-col" v-if="hasAccess">
        <div class="float-sm-right d-flex align-items-center">
          <nuxt-link :to="{ name: 'base-users-add' }" class="btn btn-primary"
            ><i class="mdi mdi-plus-circle mr-2"></i> Yangi Qo'shish</nuxt-link>
        </div>
      </div>
    </div>
    <br />
    <transition name="fade" mode="out-in">
      <DataTable
        key="userdata"
        v-bind="usersDataTable"
        :actions="true"
        :onEdit="editUser"
        :onDelete="deleteUser"
        title="Admin/Moderatorlar Jadval ko'rinishida"
      />
    </transition>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import { mapState, mapActions } from "vuex";
import permissionsMixin from "~/mixins/permissions.js";

export default {
  head() {
    return {
      title: `${this.title}`
    };
  },
  mixins: [permissionsMixin],
  computed: {
    ...mapState("modules/cities.store", ["cities"]),
    ...mapState("modules/users.store", ["users"]),
    usersDataTable() {
      return {
        title: "Admin/Moderatorlar",
        tableData: this.users,
        pageOptions: [5, 10],
        sortBy: "name",
        filterOn: ["title", "email"],
        fields: [
          {
            label: "F.I.SH",
            key: "name",
            sortable: true
          },
          {
            label: "Email Pochta",
            key: "email",
            sortable: true
          },
          {
            label: "Shahar/Tuman",
            key: "city",
            sortable: true
          },
          {
            label: "O'rni",
            key: "role",
            sortable: true
          },
        ]
      };
    }
  },
  data() {
    return {
      selectedIndex: 0,
      title: "Admin/Moderatorlar Bazasi",
      view: "",
      items: [
        {
          text: "Asosiy"
        },
        {
          text: "Admin/Moderatorlar"
        },
        {
          text: "Baza",
          active: true
        }
      ],
    };
  },
  methods: {
    ...mapActions("modules/users.store", ["DELETE_USER"]),

    async deleteUser(id) {
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
        await this.DELETE_USER(id);
        Swal.fire("O'chirildi!", "Muvaffaqiyatli o'chirildi.", "success");
        console.log(this.hasAccess)
      }
    },
    editUser(id) {
      this.$router.push({
        name: "base-users-add",
        query: { editing_user_id: id }
      });
    },
    changeView(val) {
      this.view = val;
    }
  }
};
</script>
