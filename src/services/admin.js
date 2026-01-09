import api from "./api";

const adminService = {
  getAdminDashboard: () => api.get("/admin/home"),
  deleteUser: (userId) => api.delete(`/admin/user/${userId}`),
  createArticle: (userId, postData, coverImg) => {
    const formData = new FormData();
    const articleDtoJson = JSON.stringify({
      userId,
      title: postData.title || "",
      category: postData.category || "",
      body: postData.body || "",
    });
    formData.append(
      "article",
      new Blob([articleDtoJson], { type: "application/json" })
    );
    if (coverImg) {
      formData.append("coverImage", coverImg);
    }
    return api.post("/admin/article/new", formData);
  },
  editArticle: (articleId, postData, coverImg) => {
    const formData = new FormData();
    const articleDtoJson = JSON.stringify({
      title: postData.title || "",
      category: postData.category || "",
      body: postData.body || "",
    });

    formData.append(
      "article",
      new Blob([articleDtoJson], { type: "application/json" })
    );

    if (coverImg) {
      if (typeof coverImg === "string" && coverImg.startsWith("data:")) {
        const blob = base64ToBlob(coverImg);
        formData.append("coverImage", blob, "cover-image.png");
      } else {
        formData.append("coverImage", coverImg);
      }
    }

    return api.post(`/admin/article/edit/${articleId}`, formData);
  },
  deleteArticle: (articleId) =>
    api.delete(`/admin/article/delete/${articleId}`),
  makeAdmin: (userId) => api.post(`/admin/make/${userId}`),
  removeAdmin: (userId) => api.post(`/admin/revoke/${userId}`),
};
export default adminService;
const base64ToBlob = (base64String) => {
  const parts = base64String.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);
  
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  
  return new Blob([uInt8Array], { type: contentType });
};