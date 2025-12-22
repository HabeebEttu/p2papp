import api from "./api";

 const adminService = {
     getAdminDashboard: () => api.get('/admin/home'),
     deleteUser:(userId)=> api.delete(`/admin/user/${userId}`)
}
export default adminService;