export default async function fetchResources({ store: { state, dispatch } }) {
  const resources = ["projects", "cities", "users", "auth"];
  const promises = [];

  console.log("fetcher");
  for (let resource of resources) {
    const st =
      state.modules[resource + ".store"][
        resource !== "auth" ? resource : "user"
      ];

    if (!st.length) {
      const action = `modules/${resource}.store/GET_${
        resource !== "auth" ? resource.toUpperCase() : "USER_DATA"
      }`;
      console.log(action);
      promises.push(dispatch(action));
    }
  }
  console.log(promises.length);

  await Promise.all(promises);
  console.log(state.modules["auth.store"].user);
}
