const refreshActionMiddleware = (store) => (next) => (action) => {
    const result = next(action)
    const refreshActions = [
      "admin/article/new/fulfilled",
      "admin/deleteUser/fulfilled",
    ];

  if (refreshActions.includes(action.type)) {
    store.dispatch(dashboardHome());
    }
    return result
}
export default refreshActionMiddleware