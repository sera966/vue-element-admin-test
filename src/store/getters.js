const getters = {
  permission_routes(state) {
    console.log('routes1:', state.permission.routes)
  }
  // permission_routes: state => state.permission.routes
}

export default getters
