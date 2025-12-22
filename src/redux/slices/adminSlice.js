import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminService from "../../services/admin"

export const dashboardHome = createAsyncThunk(
    "admin/home",
    async (_, { rejectWithValue }) => {
        try {
            const response = await adminService.getAdminDashboard()
            console.log("API Response:", response.data);
            return response.data
        } catch (error) {
            console.error("API Error:", error);
            return rejectWithValue(
              error.response?.data?.message || "failed to connect to server"
            );
        }
    }
)

export const deleteUser = createAsyncThunk(
    "admin/deleteUser",
    async ({ userId }, { rejectWithValue }) => {
        try {
            const response = await adminService.deleteUser(userId)
            console.log("API Response:", response.data);
            return response.data
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "failed to connect to server"
            )
        }
    }
)

const initialState = {
    users: [],
    articles: [],
    quizzes: [],
    loading: false,
    error: null
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(dashboardHome.pending, (state) => {
                state.loading = true
                state.error = null        
            })
            .addCase(dashboardHome.fulfilled, (state, action) => {
                state.loading = false 
                console.log("Action Payload:", action.payload);  
                console.log("Users:", action.payload.users);      
                console.log("Articles:", action.payload.articles); 
                console.log("Quizzes:", action.payload.quizzes);
                state.users = action.payload.users
                state.articles = action.payload.articles
                state.quizzes = action.payload.quizzes
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
                state.loading = false
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const { clearError } = adminSlice.actions
export default adminSlice.reducer