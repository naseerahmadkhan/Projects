// redux/todo/todoSlice.js
import { createSlice } from '@reduxjs/toolkit';

let nextTodoId = 0;

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [{id:0,text:'reactjs',completed:false},{id:1,text:'nextjs',completed:false}],
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({ id: nextTodoId++, text: action.payload, completed: false });
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { addTodo, removeTodo, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer;
