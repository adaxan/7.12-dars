import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  articles: [],
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    addArticles: (state, action) => {
      const newArticle = {
        id: state.articles.length + 1,
        title: action.payload,
        comments: [],
      };
      state.articles.push(newArticle);
    },
    addComment: (state, action) => {
      const { id, comment } = action.payload;
      const article = state.articles.find((item) => item.id === id);
      if (article) {
        article.comments.push(comment);
      }
    },
    updateArticle: (state, action) => {
      const { id, newTitle } = action.payload;
      const article = state.articles.find((item) => item.id === id);
      if (article) {
        article.title = newTitle; 
      }
    },
  },
});

export const { addArticles, addComment, updateArticle } = articleSlice.actions;
export default articleSlice.reducer;
