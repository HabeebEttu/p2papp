import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../services/userService";

// ✅ DON'T import anything from authSlice here

export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await userService.getProfile(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ userId, profileData, avatarFile }, { rejectWithValue }) => {
    try {
      const response = await userService.updateProfile(
        userId,
        profileData,
        avatarFile
      );

      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        storedUser.profile = response.data;
        localStorage.setItem("user", JSON.stringify(storedUser));
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);
export const getHomeArticles = createAsyncThunk(
  "user/getArticles/home",
  async (_, { rejectWithValue }) => {
    try {
      const res = await userService.getHomeArticles()
      return res.data
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'failed to connect with server')
    }
  }
)
export const uploadAvatar = createAsyncThunk(
  "user/uploadAvatar",
  async ({ userId, file }, { rejectWithValue }) => {
    try {
      const response = await userService.uploadAvatar(userId, file);
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.profile) {
        storedUser.profile.avatarUrl = response.data;
        localStorage.setItem("user", JSON.stringify(storedUser));
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to upload avatar"
      );
    }
  }
);

const initialState = {
  profile: null,
  loading: false,
  error: null,
  success: false,
  homeArticles:[]
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    resetUserState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.success = true;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });

    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.success = true;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });

    builder
      .addCase(uploadAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile) {
          state.profile.avatarUrl = action.payload;
        }
        state.success = true;
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getHomeArticles.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        
      })
      .addCase(getHomeArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.homeArticles = action.payload.articles;
        
        state.success = true;
      })
      .addCase(
        getHomeArticles.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload
}
      );
  },
});

export const { clearError, clearSuccess, resetUserState } = userSlice.actions;
export default userSlice.reducer;
