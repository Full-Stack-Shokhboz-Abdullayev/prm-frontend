export default {
  watch: {
    "$themeManager.theme"(current, old) {
      if (current !== old) {
        localStorage.setItem("theme", current);
        document.querySelector("html").setAttribute("data-theme", current);
        document.body.setAttribute("data-sidebar-color", current);
      }
    }
  },
  created() {
    const theme = localStorage.getItem("theme");
    if (theme) {
      this.$themeManager.changeTheme(theme);
    }
  }
};
