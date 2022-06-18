import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const userEndpoint = "users";
let users
const userService = {
    get: async (currentPage=0) => {
    const { data } = await httpService.get(
      `${userEndpoint}?limit=10&skip=${currentPage}`
    );
    users= !users?data.data:[...users,...data.data]
    return users;
  },
  create: async (payload) => {
    const { data } = await httpService.put(userEndpoint + payload._id, payload);
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await httpService.get(
      userEndpoint + localStorageService.getUserId()
    );
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      userEndpoint + localStorageService.getUserId(),
      payload
    );
    return data;
  },
};
export default userService;
