import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      window.location.replace("/");
    }
    else if (error.response?.status === 403) {
      window.location.reload(); // in caz ca user modifica rol in timpul sesiunii active, reload ca sa se actualizeze rolurile si pe react
    }

    return Promise.reject(error);
  }
)