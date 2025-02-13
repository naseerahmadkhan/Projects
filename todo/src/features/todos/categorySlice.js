// categorySlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addObjectInArrayInField } from '../../firebase/fieldOperations/arrayInFieldOperations';

// Define an async thunk for adding a category
export const addCategoryAsync = createAsyncThunk(
  'category/addCategoryAsync',
  async (categoryName, { rejectWithValue,getState }) => {
    try {
      let state = await getState();
      let nextId = state.categories.categories.length + 1;
      let currentCategory = { cid: nextId, cname: categoryName, date: Date.now() };

      // Assuming addObjectInArrayInField is a promise-returning function
      await addObjectInArrayInField('categories', currentCategory);

      return currentCategory;  // Return the category to be added to the state
    } catch (error) {
      return rejectWithValue(error.message);  // Return the error if the operation fails
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {
    addCategory: (state, action) => {
      state.categories = action.payload;
    },
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(cat => cat.cid !== action.payload);
    },
    updateCategory: (state, action) => {
      const cat = state.categories.find(cat => cat.cid === action.payload);
      if (cat) {
        cat.cid = !cat.cid; // Example update, adjust as needed
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCategoryAsync.pending, (state) => {
        state.loading = true;  // Set loading state to true while async operation is pending
      })
      .addCase(addCategoryAsync.fulfilled, (state, action) => {
        state.categories.push(action.payload);  // Add category to the state
        state.loading = false;  // Set loading state to false when done
      })
      .addCase(addCategoryAsync.rejected, (state, action) => {
        state.loading = false;  // Set loading state to false on failure
        state.error = action.payload;  // Capture the error message
      });
  },
});

export const { addCategory,removeCategory, updateCategory } = categorySlice.actions;
export default categorySlice.reducer;