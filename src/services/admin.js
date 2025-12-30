import api from "./api";

 const adminService = {
     getAdminDashboard: () => api.get('/admin/home'),
     deleteUser: (userId) => api.delete(`/admin/user/${userId}`),
     createArticle: (userId,postData,coverImg) => {
         const formData = new FormData()
         const articleDtoJson = JSON.stringify({
             userId,
             title: postData.title || "",
             category: postData.category || "",
            body: postData.body|| ""
         })
         formData.append("article", new Blob([articleDtoJson], { type: "application/json" }))
         if (coverImg) {
             formData.append("coverImage",coverImg)
         }
         return api.post('/admin/article/new', formData,{
             "Content-Type":'multipart/form-data'
         })
     }
}
export default adminService;