import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'; 
import userReducer from './slices/userSlice'; 
import adminReducer from "./slices/adminSlice"; 
import quizReducer from "./slices/quizSlice"; 
import refreshActionMiddleware from "../middleware/refreshDashboardMiddleware";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    admin: adminReducer,
    quiz: quizReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(refreshActionMiddleware),
  
});

export default store;
