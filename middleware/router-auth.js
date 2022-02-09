export default async function(context) {
  const { store, redirect } = context;
  if (!store.state.modules["auth.store"].user.role) {
    redirect({ name: "base-login" });
  }
}
