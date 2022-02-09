<script>
/**
 * Contacts profile component
 */
import {mapState, mapActions, mapGetters} from "vuex";
import savingAlert from "~/mixins/savingAlert.js";

export default {
    mixins: [savingAlert({name: 'base-profile'})],
    head() {
        return {
            title: `${this.title} | PRM - Loyihalar Monitoring Platformasi`,
        };
    },
    data() {
        return {
            title: "Profil",
            items: [{
                    text: "PRM",
                    href: "/"
                },
                {
                    text: "Profil",
                    active: true
                }
            ],

            CUser: {
                name: "",
                _password: "",
                cityId: ""
            },

            userChanges: false,
        };
    },

    computed: {
        ...mapState(
            "modules/cities.store",
            [
                'cities'
            ]
        ),
        ...mapState(
            "modules/auth.store",
            [
                'user'
            ]
        ),
        ...mapGetters(
            "modules/cities.store",
            [
                "GET_CITY_BY_ID"
            ]
        ),

        uCity() {
          const city = this.GET_CITY_BY_ID(this.user.cityId);
          if (city) {
            return city.title
          } else {
            return "" 
          }
        },

        uChanged() {
          const user = this.user;
          const eUser = this.CUser;
          
          return user.name != eUser.name || user.cityId != eUser.cityId || eUser._password.length >= 6
        }
    },

    methods: {
        ...mapActions(
            "modules/auth.store",
            [
                "UPDATE_USER", "DELETE_USER"
            ]
        ),

        async updateProfile() {
            const cUser = this.CUser;
            const user = this.user;
            const updatedProfile = {};

            if (cUser._password.length >= 6) {
                updatedProfile._password = cUser._password
            }

            if (cUser.name != user.name) {
              updatedProfile.name = cUser.name
            }

            if (cUser.cityId != user.cityId) {
              updatedProfile.cityId = cUser.cityId
            }

            try {
              const success = await this.UPDATE_USER(updatedProfile);
              cUser._password = '';
              this.fireSwal(success)

            } catch {
              this.fireSwal(false)
            }
        },

        async deleteProfile() {
          const req = await this.sure();

          if (req.isConfirmed) {
            const deleted = await this.DELETE_USER();
            
            if (deleted) {
              this.$router.push('/base/login')
            }
          }
        }
    },

    watch: {
        "user": {handler() {
            this.CUser.name = this.user.name;
            this.CUser.cityId = this.user.cityId;
        }, immediate: true},
    },
    middleware: 'router-auth'
};
</script>

<template>
<div>
    <PageHeader :title="title" :items="items" />
    <div class="row">
        <div class="col-lg-4 col-xl-4">
            <div class="card">
                <div class="card-body text-center">
                    <img src="https://blog.hcltechsw.com/wp-content/uploads/2019/09/user_icon.png" class="rounded-circle avatar-xl img-thumbnail" alt="profile-image" />

                    <h4 class="mt-3 mb-0">{{ user.name }}</h4>
                    <p class="text-muted">{{ user.email }}</p>

                    <div class="text-left mt-3">

                        <div class="table-responsive">
                            <table class="table table-borderless table-sm">
                                <tbody>
                                    <tr>
                                        <th scope="row">F.I.O :</th>
                                        <td class="text-muted">{{ user.name }}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">User :</th>
                                        <td class="text-muted">{{ user.role }}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Email :</th>
                                        <td class="text-muted">{{ user.email }}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Manzil :</th>
                                        <td class="text-muted">{{ uCity }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!-- end card-box -->
            </div>
        </div>
        <!-- end col-->

        <div class="col-lg-8 col-xl-8">
            <div class="card">
                <div class="card-body">
                    <form @submit.prevent="updateProfile()">
                        <h5 class="mb-3 text-uppercase bg-light p-2">
                            <i class="mdi mdi-account-circle mr-1"></i> Shaxsiy ma'lumotlar
                        </h5>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="firstname">F.I.Sh.</label>
                                    <input id="firstname" type="text" class="form-control" placeholder="Familya, Ism, Sharif" v-model="CUser.name" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="firstname">Yangi parol</label>
                                    <input id="firstname" type="text" class="form-control" placeholder="Yangi parolni kiriting" v-model="CUser._password" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="firstname">Shahar / tuman</label>
                                    <select class="form-control" v-model="CUser.cityId">
                                        <option v-for="city in cities" 
                                            :selected="city.id == user.cityId"
                                            :key="city.id" :value="city.id">
                                            {{ city.title }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <!-- end row -->

                        <div class="text-right">
                            <button type="button" class="btn btn-danger mt-2" @click="deleteProfile()">
                                <i class="mdi mdi-trash-can"></i> O'chirish
                            </button>
                            <button type="submit" class="btn btn-success mt-2" :disabled="!uChanged" :class="{'disabled': !uChanged}">
                                <i class="mdi mdi-content-save"></i> Saqlash
                            </button>
                        </div>
                    </form>
                </div>
                <!-- end card-box-->
            </div>
        </div>
        <!-- end col -->
    </div>
    <!-- end row-->
</div>
</template>
