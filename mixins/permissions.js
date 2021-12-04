export default {
  computed: {
    user() {
      return this.$store.state.modules["auth.store"].user;
    },
    hasAccess() {
      return this.user.role !== undefined && this.user.role !== null;
    }
  }
};
