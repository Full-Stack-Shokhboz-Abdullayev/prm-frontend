import Vue from "vue";

const themeManager = Vue.observable({
  theme: "light",
  changeTheme(value) {
    themeManager.theme = value;
  }
});

Vue.prototype.$themeManager = themeManager;
