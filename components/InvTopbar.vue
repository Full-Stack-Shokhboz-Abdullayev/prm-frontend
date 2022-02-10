<script>
/**
 * Topbar component
 */
import { mapActions, mapState } from "vuex";
import buttons from "../pages/ui/buttons.vue";

export default {
  components: { buttons },
  methods: {
    /**
     * Toggle menu
     */
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    async toggleTheme() {
      const theme = this.$themeManager.theme === "dark" ? 'light' : 'dark'
      const el = document.querySelector(".ripple");
      el.classList.add("ripple-anim-" + theme);
      setTimeout(() => {
          this.$themeManager.changeTheme(theme);
      }, 700);
      await new Promise(resolve =>
        setTimeout(() => {
          resolve();
        }, 1600)
      );
      el.classList.remove("ripple-anim-"+theme);
    },
    /**
     * Full screen
     */
    initFullScreen() {
      document.body.classList.toggle("fullscreen-enable");
      if (
        !document.fullscreenElement &&
        /* alternative standard method */
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },

    horizonalmenu() {
      let element = document.getElementById("topnav-menu-content");
      element.classList.toggle("show");
    },
    /**
     * Logout user
     */
    ...mapActions("modules/auth.store", ["LOGOUT"]),


  },
  computed: {
    ...mapState("modules/auth.store", ["user"])
  }
};
</script>

<template>
  <!-- Topbar Start -->
  <div class="navbar-custom">
    <div class="container-fluid">
      <ul class="list-unstyled topnav-menu float-right mb-0">
        <li class="d-none d-lg-block">
          <form class="app-search">
            <div class="app-search-box">
              <div class="input-group">
                <input
                  type="search"
                  class="form-control"
                  placeholder="Tizimda Qidiruv..."
                  id="top-search"
                />
                <div class="input-group-append">
                  <button class="btn" type="submit">
                    <i class="fe-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </li>

       
        <li class="dropdown d-none d-lg-inline-block">
          <a
            class="nav-link dropdown-toggle arrow-none waves-effect waves-light"
            @click="initFullScreen"
            data-toggle="fullscreen"
            href="#"
          >
            <i class="fe-maximize noti-icon"></i>
          </a>
        </li>
        <li class="dropdown">
          <a
            class="nav-link dropdown-toggle arrow-none waves-effect waves-light cursor-pointer"
            @click="toggleTheme"
            
          >
            <i
              :class="
                ($themeManager.theme === 'dark' ? 'fe-sun' : 'fe-moon') +
                  ' noti-icon'
              "
            ></i>
          </a>
        </li>

        <b-nav-item-dropdown
          right
          v-if="user.role"
          class="notification-list topbar-dropdown"
          menu-class="profile-dropdown"
          toggle-class="p-0"
        >
          <template slot="button-content" class="nav-link dropdown-toggle">
            <div class="nav-user mr-0 d-flex align-items-center">
              <i style="font-size: 24px" class="ri-user-2-fill"></i>
              <span class="pro-user-name ml-2">
                {{ user.name }}
                <i class="mdi mdi-chevron-down"></i>
              </span>
            </div>
          </template>

          <b-dropdown-item href="#" to="/base/profile">
            <i class="ri-settings-3-line"></i>
            <span>Tahrirlash</span>
          </b-dropdown-item>

          <b-dropdown-divider></b-dropdown-divider>
          <button class="dropdown-item" @click="LOGOUT">
            <i class="fe-log-out mr-1"></i>
            <span>Tizimdan Chiqish</span>
          </button>
        </b-nav-item-dropdown>

      </ul>


      <ul class="list-unstyled topnav-menu topnav-menu-left m-0">
        <li>
          <button
            class="button-menu-mobile waves-effect waves-light"
            @click="toggleMenu"
          >
            <i class="fe-menu"></i>
          </button>
        </li>

        <li>
          <!-- Mobile menu toggle (Horizontal Layout)-->
          <a
            class="navbar-toggle nav-link"
            data-toggle="collapse"
            @click="horizonalmenu()"
            data-target="#topnav-menu-content"
          >
            <div class="lines">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </a>
          <!-- End mobile menu toggle-->
        </li>
        <b-nav-item-dropdown v-if="user.role" class="d-none d-lg-block">
          <template slot="button-content">
            Yangi Qo'shish
            <i class="mdi mdi-chevron-down"></i>
          </template>
          <b-dropdown-item :to="{ name: 'base-projects-add' }">
            <i class="fe-briefcase mr-1"></i>
            <span>Loyiha qo'shish</span>
          </b-dropdown-item>
          <b-dropdown-item :to="{ name: 'base-cities-add' }">
            <i class="fe-map-pin mr-1"></i>
            <span>Shahar/Tuman qo'shish</span>
          </b-dropdown-item>
          <b-dropdown-item v-if="user.role === 'admin'" :to="{ name: 'base-users-add' }">
            <i class="fe-user mr-1"></i>
            <span>Moderator/Admin qo'shish</span>
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </ul>
      <div class="clearfix"></div>
    </div>
  </div>
  <!-- end Topbar -->
</template>
