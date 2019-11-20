import Cookie from "js-cookie";

const state = {
  sidebar: {
    opened: Cookie.get("sidebarStatus") ? !!+Cookie.get("sidebarStatus") : true,
  },
};

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened;
    if (state.sidebar.opened) {
      Cookie.set("sidebarStatus", 1);
    } else {
      Cookie.set("sidebarStatus", 0);
    }
  },
  CLOSE_SIDEBAR: state => {
    Cookie.set("sidebar", 0);
    state.sidebar.opened = false;
  },
};

const actions = {
  toggleSideBar({ commit }) {
    commit("TOGGLE_SIDEBAR");
  },
  closeSideBar({ commit }) {
    commit("CLOSE_SIDEBAR");
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
