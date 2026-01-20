import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminService from "../../services/admin";
import { quizService } from "../../services/quizzes/quizService";
import { fetchQuizzes } from "./quizSlice";

export const dashboardHome = createAsyncThunk(
  "admin/home",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.getAdminDashboard();
      
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(
        error.response?.data?.message || "failed to connect to server"
      );
    }
  }
);

export const deleteQuiz = createAsyncThunk(
  "quiz/delete",
  async ({ quizId }, { rejectWithValue, dispatch }) => {
    try {
      await quizService.deleteQuiz(quizId);
      dispatch(fetchQuizzes({ page: 0, size: 10 }));
      return quizId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete quiz"
      );
    }
  }
);
export const updateQuiz = createAsyncThunk(
  "quiz/update",
  async ({ quizId, quizData }, { rejectWithValue, dispatch }) => {
    try {
      const response = await adminService.updateQuiz(quizId, quizData);
      dispatch(fetchQuizzes({ page: 0, size: 10 }));
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update quiz"
      );
    }
  }
);



export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async ({ userId }, { rejectWithValue, dispatch }) => {
    try {
      const response = await adminService.deleteUser(userId);

      dispatch(dashboardHome());

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "failed to connect to server"
      );
    }
  }
);

export const createArticle = createAsyncThunk(
  "admin/article/new",
  async ({ userId, postData, coverImg }, { rejectWithValue, dispatch }) => {
    try {
      const response = await adminService.createArticle(
        userId,
        postData,
        coverImg
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "failed to connect to server"
      );
    }
  }
);
export const deleteArticle = createAsyncThunk(
  "admin/article/delete",
  async ({ articleId }, { rejectWithValue, dispatch }) => {
    try {
      const response = await adminService.deleteArticle(articleId);
      dispatch(dashboardHome());
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "failed to connect to server"
      );
    }
  }
);
export const createQuiz = createAsyncThunk(
  "quiz/create",
  async ({ userId, quizData }, { rejectWithValue, dispatch }) => {
    try {
      const response = await quizService.createQuiz(userId, quizData);
      dispatch(fetchQuizzes({ page: 0, size: 10 }));
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create quiz"
      );
    }
  }
);
export const removeAdmin = createAsyncThunk(
  "admin/removeAdmin",
  async ({ userId }, { rejectWithValue, dispatch }) => {
    try {
      const response = await adminService.removeAdmin(userId);
      dispatch(dashboardHome());
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove admin privileges"
      );
    }
  }
);
export const editArticle = createAsyncThunk(
  "admin/article/edit",
  async ({ articleId, postData, coverImg }, { rejectWithValue, dispatch }) => {
    try {
      console.log(userId)
      const response = await adminService.editArticle(
        articleId,
        postData,
        coverImg
      );

      dispatch(dashboardHome());

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "failed to connect to server"
      );
    }
  }
);
export const makeAdmin = createAsyncThunk(
  "admin/admin/make",
  async ({ userId }, { rejectWithValue, dispatch }) => {
    try {
      const response = await adminService.makeAdmin(userId);

      dispatch(dashboardHome());
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "failed to connect to server"
      );
    }
  }
);

const initialState = {
  users: [],
  articles: [],
  quizzes: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(dashboardHome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(dashboardHome.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.articles = action.payload.articles;
        state.quizzes = action.payload.quizzes;
      })
      .addCase(dashboardHome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createArticle.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editArticle.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteArticle.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(makeAdmin.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(makeAdmin.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(makeAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeAdmin.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removeAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createQuiz.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteQuiz.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteQuiz.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuiz.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
        
      });
  },
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;
