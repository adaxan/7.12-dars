import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addArticles } from '../store/articleSlice';

function CreateArticle() {
  const tasksRef = useRef();
  const dispatch = useDispatch();

  function handleAdd() {
    const newArticleTitle = tasksRef.current.value.trim();
    if (newArticleTitle) {
      dispatch(addArticles(newArticleTitle)); 
      tasksRef.current.value = ''; 
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4 mt-8">    
      <input
        ref={tasksRef}
        type="text"
        placeholder="Enter article title..."
        className="w-80 input input-warning"
      />
      <button
        onClick={handleAdd}
        className="btn btn-warning"
      >
        Add Article 
      </button>
    </div>
  );
}

export default CreateArticle; 
