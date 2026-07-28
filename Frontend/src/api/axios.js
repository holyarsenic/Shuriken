import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  withCredentials: true,
});

let refreshing = null;

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Don't refresh for these endpoints
    if (
      originalRequest.url === "/users/login" ||
      originalRequest.url === "/users/register" ||
      originalRequest.url === "/users/change-password" ||
      originalRequest.url === "/users/refresh-token"
    ) {
      throw error;
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        if (!refreshing) {
          refreshing = api.post("/users/refresh-token");
        }

        await refreshing;

        return api(originalRequest);
      } catch (err) {
          console.error(err);
          throw err;
      } finally {
        refreshing = null;
      }
    }

    throw error;
  }
);

export default api;