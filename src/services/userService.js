import api from "./api";

const userService = {
    getProfile:(userId)=>api.get(`/profile/${userId}`),
    uploadAvatar: async (userId, file) => {
        const formData = new FormData()
        formData.append('file',file)
        return api.post(`/profile/${userId}/avatar`,formData, {
            headers: {
                "Content-Type":'multipart/form-data'
            }
        });
    },
    updateProfile: async (userId, profileData, avatarFile) => {
        const formData = new FormData()
        formData.append('profile',new Blob([JSON.stringify(profileData)],{
            type:'application/json'
        }))
        if (avatarFile) {
      formData.append('avatar', avatarFile);
    }
    return api.put(`/profile/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    }
}