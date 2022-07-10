export const localStorageAccessToken = {
  set: (accessToken?: string) => {
    console.log({ accessToken });
    if (accessToken) {
      localStorage.setItem("access_token", accessToken);
    } else {
      localStorage.removeItem("access_token");
    }
  },
  get: () => {
    return localStorage.getItem("access_token");
  },
};
