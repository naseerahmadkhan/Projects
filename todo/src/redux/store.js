// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todos/todoSlice';
import categoryReducer from '../features/todos/categorySlice'
import modalReducer from '../features/modal/modalSlice'
import userReducer from '../features/user/userSlice'
import stateReducer from '../features/state/stateSlice'

const store = configureStore({
  reducer: {
    todo: todoReducer,
    categories:categoryReducer,
    modals: modalReducer,
    user: userReducer,
    states: stateReducer
  },
});

export default store;
