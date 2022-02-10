import { getTokens, persistTokens, refreshTokens } from "../utils/tokens.util";

export default function({ $axios }, inject) {
  // Add a request interceptor
  const $protectedAxios = $axios.create();

  $protectedAxios.interceptors.request.use(request => {
    request.headers.Authorization =
      "Bearer " + localStorage.getItem("accessToken");
    return request;
  });

  $protectedAxios.interceptors.response.use(
    async response => {
      if (!response.data.success) {
        return Promise.reject(response);
      }
      return response;
    },
    async function(error) {
      const originalRequest = error.config;
      if (
        (error.response.status === 403 || error.response.status === 401) &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        try {
          const { success } = await refreshTokens($axios);
          if (success) {
            return await $protectedAxios(originalRequest);
          }
          return { success };
        } catch (err) {
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    }
  );

  inject("protectedAxios", $protectedAxios);
}
