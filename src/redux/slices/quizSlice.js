import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { quizService } from "../../services/quizzes/quizService";

export const fetchQuizzes = createAsyncThunk(
    "quiz/fetchAll",
    async ({ page= 0, size= 10 }, { rejectWithValue,dispatch }) => {
        try {
            const res = await quizService.getAllQuizzes(page, size)
            dispatch(getQuizCategories())
            
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message)
        }
    })

export const submitQuiz = createAsyncThunk(
  "quiz/submit",
  async ({ quizId, answers }, { rejectWithValue }) => {
    try {
      const submission = {
        quizId,
        answers,
      };
      const response = await quizService.submitQuiz(quizId, submission);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to submit quiz"
      );
    }
  }
);
export const getQuizCategories = createAsyncThunk(
    "quiz/get/categories",
    async (_, { rejectWithValue }) => {
        try {
            const response = await quizService.getCategories();
            return response.data
        } catch (error) {
            return rejectWithValue(
                error
            )
        }
    }
)

const initialState = {
  quizzes: [],
  currentQuiz: null,
  quizResult: null,
  loading: false,
  error: null,
    totalPages: 0,
  categories:[],
  currentPage: 0,
};
const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearQuizResult: (state) => {
      state.quizResult = null;
    },
    setCurrentQuiz: (state, action) => {
      state.currentQuiz = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = action.payload.quizzes || [];
        state.totalPages = action.payload.totalPages || 0;
        state.currentPage = action.payload.number || 0;
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(submitQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.quizResult = action.payload;
      })
      .addCase(submitQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }).addCase(getQuizCategories.pending, (state, action) => {
          state.loading = true;
          state.error = {}
      }).addCase(getQuizCategories.fulfilled, (state, action) => {
          state.categories = action.payload
        state.loading = false
      }).addCase(getQuizCategories.rejected,(state,action)=>{
          state.loading = false
          state.error = action.payload
      });
  },
});

export const { clearError, clearQuizResult, setCurrentQuiz } = quizSlice.actions;
export default quizSlice.reducer;