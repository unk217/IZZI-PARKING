import postData from "@/axios_res";
import { NEKOT } from "@/global";

export default {
  namespaced: true,
  state: {
    get_users: null,
  },
  getters: {
    getUserData_: (state) => (list) => state[list],
  },
  mutations: {
    setUserData_(state, data) {
      state[data.list] = data.res;
    },
  },
  actions: {
    async createUser_({ commit }, { data }) {
      try {
        const RES = await postData({ header: { x_token: NEKOT }, method: "POST", url: `users`, data });
        return RES;
      } catch (error) {
        console.error("createUser_", error);
      }
    },
    async _getUsers({ commit }) {
      try {
        console.log("_getUser");
        const RES = await postData({ header: { x_token: NEKOT }, method: "GET", url: `get&users` });
        console.log(RES);
        if (!RES.msg) {
          commit("setUserData_", {
            list: "get_users",
            res: RES,
          });
          return RES;
        } else {
          return RES;
        }
      } catch (error) {
        console.error("_getUsers", error);
      }
    },
    async _putUser({ commit }, { USER, password, data }) {
      try {
        const RES = await postData({
          url: `users/${USER}/${password}`,
          header: { x_token: NEKOT },
          method: "PUT",
          data: data,
        });
        return RES;
      } catch (error) {
        console.error("_putUser", error);
      }
    },
    async putUserNoPassword_({ commit }, { USER, data }) {
      try {
        const RES = await postData({
          url: `users/${USER}`,
          header: { x_token: NEKOT },
          method: "PUT",
          data: data,
        });
        return RES;
      } catch (error) {
        console.error("_putUser", error);
      }
    },
    async deleteUser_({ commit }, { USER }) {
      try {
        const RES = await postData({ url: `users/${USER}`, header: { x_token: NEKOT }, method: "DELETE" });
        return RES;
      } catch (error) {
        console.error("deleteUser_", error);
      }
    },
    async validPassword_({ commit }, { document, current_password }) {
      try {
        const RES = await postData({
          url: `passsword/${document}/${current_password}`,
          header: { x_token: NEKOT },
          method: "GET",
        });
        return RES;
      } catch (error) {
        console.error("validPassword_", error);
      }
    },
  },
};
