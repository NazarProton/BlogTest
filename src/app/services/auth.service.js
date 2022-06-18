import axios from "axios";
import localStorageService from "./localStorage.service";

const httpAuth = axios.create({
  baseURL: "http://test-blog-api.ficuslife.com/api/v1/",
});

const authService = {
  register: async ({ email, password }) => {
    const { data } = await httpAuth.post("accounts:signUp", {
      email,
      password,
    });
    return data;
  },
  login: async ({ email, password }) => {
    const { data } = await httpAuth.post("auth", {
      email,
      password,
    });
    const currentUser = await httpAuth.get("auth/user", {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });
    return {currentUser:currentUser.data,data:data.token};
  },
  refresh: async () => {
    const { data } = await httpAuth.post("token", {
      grant_type: "refresh_token",
      refresh_token: localStorageService.getRefreshToken(),
    });
    return data;
  },
};

export default authService;
