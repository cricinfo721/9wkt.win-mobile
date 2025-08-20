const axios = require("axios");

function getHeaders() {
  return { "Content-Type": "application/json" };

  // return {
  //   "Content-Type": "multipart/form-data",
  //   'Accept': "application/json",
  //   'type': "formData",
  // };
}
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
  // timeout: 1000,
  headers: getHeaders(),
});

instance.interceptors.request.use((config) => {
  if (
    [
      "/v1/user/easytogo-casino-amount-add",
      "/v1/wallet/doLoginAndLaunchEasyToCasino",
      "/v1/user/casino-amount-add",
      "/v1/wallet/doLoginAndLaunchGame",
      "/v1/wallet/login",
    ].includes(config?.url?.split("?")[0])
  ) {
    document.getElementById("loading").style.display = "flex";
  }
  const token = localStorage.getItem("token");
  if (!token) {
    return config;
  }
  config = {
    ...config,
    headers: { ...config.headers, Authorization: `Bearer ${token}` },
  };
  return config;
});

instance.interceptors.response.use(
  function (response) {
    if (document.getElementById("loading") !== null) {
      document.getElementById("loading").style.display = "none";
    }
    return response;
  },
  function (error) {
    const { status } = error.response;
    if (document.getElementById("loading") !== null) {
      document.getElementById("loading").style.display = "none";
    }
    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("uniqueId");
      window.location.reload();
    } else if (status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("uniqueId");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

function apiGet(url, params = {}) {
  return instance.get(url, { params });
}

function apiPost(url, body) {
  return instance.post(url, body);
}

function apiPut(url, body) {
  return instance.put(url, body);
}

function apiDelete(url) {
  return instance.delete(url);
}

export { getHeaders, apiGet, apiPost, apiPut, apiDelete };
