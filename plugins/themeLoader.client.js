import Vue from "vue";

const themeManager = Vue.observable({
  theme: "light",
  changeTheme(value) {
    console.log("called manager");
    themeManager.theme = value;
    console.log(themeManager.theme);
  }
});

Vue.prototype.$themeManager = themeManager;
