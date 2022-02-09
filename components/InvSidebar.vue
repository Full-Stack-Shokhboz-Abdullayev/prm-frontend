<script>
import { mapState } from "vuex";
import { menuItems } from "./menus/menu";

/**
 * Sidebar component
 */
export default {
  data() {
    return {
      menuItems: menuItems
    };
  },
  props: {
    width: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: true
    },
    menu: {
      type: String,
      required: true
    },
    topbar: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(["layout"]),
    ...mapState("modules/auth.store", ["user"])
  },
  watch: {
    width: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "boxed":
              document.body.setAttribute("data-layout-width", "boxed");
              document.body.setAttribute("data-sidebar-size", "condensed");
              break;
            case "fluid":
              document.body.setAttribute("data-layout-width", "fluid");
              document.body.removeAttribute("data-sidebar-size");
              document.body.removeAttribute("data-layout-width");
              break;
            default:
              document.body.setAttribute("data-layout-mode", "fluid");
              break;
          }
        }
      }
    },
    size: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "default":
              document.body.setAttribute("data-sidebar-size", "default");
              break;
            case "condensed":
              document.body.setAttribute("data-sidebar-size", "condensed");
              break;
            case "compact":
              document.body.setAttribute("data-sidebar-size", "compact");
              break;
            default:
              document.body.setAttribute("data-sidebar-size", "default");
              break;
          }
        }
      }
    },
    menu: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "fixed":
              document.body.setAttribute("data-layout-menu-position", "fixed");
              break;
            case "scrollable":
              document.body.setAttribute(
                "data-layout-menu-position",
                "scrollable"
              );
              break;
            default:
              document.body.setAttribute("data-layout-menu-position", "fixed");
              break;
          }
        }
      }
    },
    topbar: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "dark":
              document.body.setAttribute("data-topbar-color", "dark");
              break;
            case "light":
              document.body.setAttribute("data-topbar-color", "light");
              break;
            default:
              document.body.setAttribute("data-topbar-color", "dark");
              break;
          }
        }
      }
    }
  },

  mounted: function() {
    if (this.$nuxt.isClient) {
      this._activateMenuDropdown();
      this.$router.afterEach((routeTo, routeFrom) => {
        this._activateMenuDropdown();
      });
      console.log(this.user);
    }
  },
  methods: {
    /**
     * Returns true or false if given menu item has child or not
     * @param item menuItem
     */
    hasItems(item) {
      return item.subItems !== undefined ? item.subItems.length > 0 : false;
    },

    mappedSubItems({ subItems = [] }) {
      return subItems.filter(i =>
        i.roles
          ? this.user.role
            ? i.roles.includes(this.user.role)
            : false
          : true
      );
    },

    _activateMenuDropdown() {
      const resetParent = el => {
        el.classList.remove("active");
        var parent = el.parentElement;
        if (parent) {
          parent.classList.remove("menuitem-active");
          const parent2 = parent.parentElement;
          if (parent2) {
            const parent3 = parent2.parentElement;
            if (parent3) {
              parent3.classList.remove("show");
              const parent4 = parent3.parentElement;
              if (parent4) {
                parent4.classList.remove("menuitem-active");
              }
            }
          }
        }
      };
      var links = document.getElementsByClassName("side-nav-link-ref");
      var matchingMenuItem = null;
      const paths = [];
      for (let i = 0; i < links.length; i++) {
        // reset menu
        resetParent(links[i]);
      }
      for (var i = 0; i < links.length; i++) {
        paths.push(links[i]["pathname"]);
      }
      var itemIndex = paths.indexOf(window.location.pathname);
      if (itemIndex === -1) {
        const strIndex = window.location.pathname.lastIndexOf("/");
        const item = window.location.pathname.substr(0, strIndex).toString();
        matchingMenuItem = links[paths.indexOf(item)];
      } else {
        matchingMenuItem = links[itemIndex];
      }

      if (matchingMenuItem) {
        matchingMenuItem.classList.add("active");
        var parent = matchingMenuItem.parentElement;

        /**
         * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
         * We should come up with non hard coded approach
         */
        if (parent) {
          parent.classList.add("menuitem-active");
          const parent2 = parent.parentElement;
          if (parent2) {
            const parent3 = parent2.parentElement;
            if (parent3) {
              // console.log(parent3)
              parent3.classList.add("show");
              const parent4 = parent3.parentElement;
              if (parent4) {
                parent4.classList.add("menuitem-active");
              }
            }
          }
        }
      }
    }
  }
};

// if user is signed in > if roles are defined > if user has appr role > render
// if user is not signed in > if roles are defined > if user has not appr role > unrender
</script>

<template>
  <!-- ========== Left Sidebar Start ========== -->
  <div class="left-side-menu">
    <!-- LOGO -->
    <div class="logo-box">
      <nuxt-link to="/" class="logo logo-dark text-center">
        <span class="logo-sm">
          <img src="~/assets/images/prm-mini.svg" alt height="40" />
          <!-- <span class="logo-lg-text-light">Minton</span> -->
        </span>
        <span class="logo-lg">
          <img src="~/assets/images/prm.svg" alt height="50" />
          <!-- <span class="logo-lg-text-light">M</span> -->
        </span>
      </nuxt-link>

      <nuxt-link to="/" class="logo logo-light text-center">
        <span class="logo-sm">
          <img src="~/assets/images/prm-mini.svg" alt height="40" />
        </span>
        <span class="logo-lg">
          <img src="~/assets/images/prm.svg" alt height="50" />
        </span>
      </nuxt-link>
    </div>

    <simplebar class="h-100" data-simplebar>
      <!--- Sidemenu -->
      <div id="sidebar-menu">
        <!-- Left Menu Start -->
        <ul class="list-unstyled" id="side-menu">
          <template v-for="item in menuItems">
            <li class="menu-title" v-if="item.isTitle" :key="item.id">
              {{ item.label }}
            </li>

            <li
              v-if="
                !item.isTitle &&
                  !item.isLayout &&
                  (item.roles
                    ? user.role
                      ? item.roles.includes(user.role)
                      : item.roles.includes('guest')
                    : true)
              "
              :key="item.id"
            >
              <a
                v-if="hasItems(item)"
                href="javascript:void(0);"
                @click="item.isMenuCollapsed = !item.isMenuCollapsed"
                :class="{
                  'has-arrow': !item.badge,
                  'has-dropdown': item.badge
                }"
              >
                <i :class="item.icon" v-if="item.icon"></i>
                <span>{{ item.label }}</span>
                <span class="menu-arrow" v-if="!item.badge"></span>
                <span
                  :class="
                    `badge badge-pill badge-${item.badge.variant} float-right`
                  "
                  v-if="item.badge"
                  >{{ item.badge.text }}</span
                >
              </a>

              <nuxt-link
                :to="item.link"
                v-if="!hasItems(item)"
                class="side-nav-link-ref"
              >
                <i :class="item.icon" v-if="item.icon"></i>
                <span>{{ item.label }}</span>
                <span
                  :class="
                    `badge badge-pill badge-${item.badge.variant} float-right`
                  "
                  v-if="item.badge"
                  >{{ item.badge.text }}</span
                >
              </nuxt-link>
              <div
                class="collapse"
                :class="{ show: item.isMenuCollapsed }"
                id="sidebarTasks"
              >
                <ul
                  v-if="hasItems(item)"
                  class="sub-menu nav-second-level"
                  aria-expanded="false"
                >
                  <li
                    v-for="(subitem, index) of mappedSubItems(item)"
                    :key="index"
                  >
                    <nuxt-link
                      :to="subitem.link"
                      v-if="!hasItems(subitem)"
                      class="side-nav-link-ref"
                      >{{ subitem.label }}</nuxt-link
                    >
                    <a
                      v-if="hasItems(subitem)"
                      class="side-nav-link-a-ref has-arrow"
                      @click="
                        subitem.isMenuCollapsed = !subitem.isMenuCollapsed
                      "
                      href="javascript:void(0);"
                      >{{ subitem.label }}
                      <span class="menu-arrow"></span>
                    </a>

                    <div
                      class="collapse"
                      :class="{ show: subitem.isMenuCollapsed }"
                    >
                      <ul
                        v-if="hasItems(subitem)"
                        class="sub-menu"
                        aria-expanded="false"
                      >
                        <li
                          v-for="(subSubitem, index) of subitem.subItems"
                          :key="index"
                        >
                          <nuxt-link
                            :to="subSubitem.link"
                            class="side-nav-link-ref"
                            >{{ subSubitem.label }}</nuxt-link
                          >
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          </template>
        </ul>
      </div>
      <!-- End Sidebar -->

      <div class="clearfix"></div>
    </simplebar>
    <!-- Sidebar -left -->
  </div>
  <!-- Left Sidebar End -->
</template>
