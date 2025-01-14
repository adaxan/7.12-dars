import { configureStore } from "@reduxjs/toolkit";
import articleReducer from './articleSlice'; 

const store = configureStore({
  reducer: {
    article: articleReducer  
  }
});

export default store;
