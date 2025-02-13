// features/modalSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: false,
  addTodo: false,
  drawer: false,
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      const target = action.payload;
      state[target] = !state[target]; // Toggle the state of the modal
    },
  },
});

export const { toggleModal } = modalSlice.actions;
export default modalSlice.reducer;
