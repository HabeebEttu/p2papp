import api from "../api";

const articleService = {
    getCategories: () => api.get('/articles/categories'),
    getArticles: ()=> api.get('/articles'),
}
export default articleService