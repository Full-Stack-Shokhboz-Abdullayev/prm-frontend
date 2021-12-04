<template>
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-6 col-xl-5">
      <div class="card">
        <div class="card-body p-4">
          <div class="text-center w-75 m-auto">
            <div class="auth-logo">
              <nuxt-link to="/" class="logo logo-dark text-center">
                <span class="logo-lg">
                  <img src="~/assets/images/prm-login-light.svg" alt height="50" />
                </span>
              </nuxt-link>

              <nuxt-link to="/" class="logo logo-light text-center">
                <span class="logo-lg">
                  <img src="~/assets/images/prm.svg" alt height="50" />
                </span>
              </nuxt-link>
            </div>
            <p class="text-muted mb-4 mt-3">
              Admin panelga o'tish uchun email va parolni kiriting.
            </p>
          </div>

          <form @submit.prevent="onSubmit(form)">
            <div class="form-group mb-3">
              <label for="emailaddress">Elektron pochta</label>
              <input
                v-model="form.email"
                class="form-control"
                type="email"
                id="emailaddress"
                required
                placeholder="Emailingizni kiriting"
              />
            </div>

            <div class="form-group mb-3">
              <label for="password">Parol</label>
              <div class="input-group input-group-merge">
                <input
                  v-model="form.password"
                  :type="passwordShown ? 'text' : 'password'"
                  id="password"
                  class="form-control"
                  placeholder="Parloni kiriting"
                />
                <button
                  type="button"
                  class="btn btn-white"
                  @click="passwordShown = !passwordShown"
                >
                  <i :class="passwordShown ? 'fe-eye-off' : 'fe-eye'"></i>
                </button>
              </div>
            </div>
            <div v-if="errors.length > 0" class="alert alert-danger">
              <h5 class="text-light-h">Elektron pochta yoki parol xato!</h5>
              <!-- <ul role="alert">
                <li
                  v-for="(error, index) in errors"
                  :key="'loginerrors' + index"
                >
                  {{ error }}
                </li>
              </ul> -->
            </div>
            <div class="form-group mb-0 text-center">
              <b-button
                type="submit"
                variant="primary"
                block
                :disabled="loading"
              >
                <b-spinner v-if="loading" small></b-spinner>
                <span v-else>
                  Tizimga kirish
                </span>
              </b-button>
              <br />
              <nuxt-link :to="{ name: 'base-dashboard' }">
                Ma'lumotlarni ko'rishda davom etish
                <i class="fe-arrow-right"></i>
              </nuxt-link>
            </div>
          </form>
        </div>
        <!-- end card-body -->
      </div>
      <!-- end card -->

      <!-- end row -->
    </div>
    <!-- end col -->
  </div>
  <!-- end row -->
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  middleware: "router-unauth",
  layout: "auth",
  data() {
    return {
      passwordShown: false,
      title: "Avtorizatsiya",
      form: {
        email: "",
        password: ""
      },
      loading: false
    };
  },
  head() {
    return {
      title: this.title
    };
  },
  computed: {
    ...mapState("modules/auth.store", ["errors"])
  },
  methods: {
    ...mapMutations("modules/auth.store", ["SET_ERRORS"]),
    ...mapActions("modules/auth.store", ["LOGIN"]),

    async onSubmit() {
      console.log(this.errors);
      this.loading = true;
      this.SET_ERRORS([]);
      await this.LOGIN(this.form);
      this.loading = false;
    }
  }
};
</script>
