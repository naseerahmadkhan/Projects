// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todos/todoSlice';
import categoryReducer from '../features/todos/categorySlice'
import modalReducer from '../features/modal/modalSlice'

const store = configureStore({
  reducer: {
    todo: todoReducer,
    categories:categoryReducer,
    modals: modalReducer,
  },
});

export default store;
