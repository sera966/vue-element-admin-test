const getters = {
  // permission_routes(state) {
  //   console.log('routes1:', state.permission.routes)
  // }
  sidebar: state => state.app.sidebar,
  permission_routes: state => state.permission.routes,
  roles: state => state.user.roles,
};

export default getters;
