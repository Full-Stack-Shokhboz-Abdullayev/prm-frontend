export default async function(context) {
  const { store, redirect } = context;

  const role = store.state.modules["auth.store"].user.role;
  if (role !== "admin") {
    if (role) {
      return redirect({ name: "base-dashboard" });
    }
    return redirect({ name: "base-login" });
  }
}
