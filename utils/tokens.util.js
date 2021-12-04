export function persistTokens(tokensData) {
  for (const dataKey of Object.keys(tokensData)) {
    localStorage.setItem(dataKey, tokensData[dataKey]);
  }
}

export function getTokens() {
  return {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
    accessTokenExpire: new Date(localStorage.getItem("accessTokenExpire")),
    refreshTokenExpire: new Date(localStorage.getItem("refreshTokenExpire"))
  };
}

export async function refreshTokens($axios) {
  const { refreshToken } = getTokens();
  if (!refreshToken) {
    return { success: false };
  }
  try {
    const {
      data: { success, data }
    } = await $axios.post("/auth/refresh-tokens", {
      refreshToken
    });
    if (success) {
      persistTokens(data);
    }
  } catch (err) {
    // Logout here
    return { success: false };
  }
  return { success: true, tokensData: getTokens() };
}
