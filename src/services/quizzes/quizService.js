import api from "../api";

export const quizService = {
  getAllQuizzes: (page = 0, size = 10) =>
    api.get(`/quizzes?page=${page}&size=${size}`),
  getQuizById: (id, includeAnswers = false) =>
    api.get(`/quizzes/${id}?includeAnswers=${includeAnswers}`),
  createQuiz: (userId, quizData) => {
    const payload = {
      ...quizData,
      userId,
    };
    return api.post("/admin/quizzes", payload);
  },
  deleteQuiz: (id) => api.delete(`/admin/quizzes/${id}`),
    submitQuiz: (id, submission) => api.post(`/quizzes/${id}/submit`, submission),
  getCategories:()=> api.get("/quizzes/categories/get")
};
