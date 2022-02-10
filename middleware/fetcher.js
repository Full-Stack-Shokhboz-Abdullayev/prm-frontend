export default async function fetchResources({ store: { state, dispatch } }) {
  const resources = ["projects", "cities", "users", "auth"];
  const promises = [];

  for (let resource of resources) {
    const st =
      state.modules[resource + ".store"][
        resource !== "auth" ? resource : "user"
      ];

    if (!st.length) {
      const action = `modules/${resource}.store/GET_${
        resource !== "auth" ? resource.toUpperCase() : "USER_DATA"
      }`;
      promises.push(dispatch(action));
    }
  }
  await Promise.all(promises);
}
