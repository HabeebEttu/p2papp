import api from "./api";

const userService = {
  getProfile: (userId) => api.get(`/profile/${userId}`),
  uploadAvatar: async (userId, file) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post(`/profile/${userId}/avatar`, formData);
  },
  updateProfile: async (userId, profileData, avatarFile) => {
    const formData = new FormData();

    const profileDtoJson = JSON.stringify({
      firstName: profileData.firstName || "",
      lastName: profileData.lastName || "",
      bio: profileData.bio || "",
    });

    // Append the profile DTO as a blob with the correct content type
    formData.append(
      "profile",
      new Blob([profileDtoJson], { type: "application/json" })
    );

    // Append avatar if provided
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    // Remove Content-Type header to let FormData set multipart/form-data with boundary
    return api.put(`/profile/${userId}`, formData, {
      headers: {
        "Content-Type": undefined,
      },
    });
  },
};
export default userService;