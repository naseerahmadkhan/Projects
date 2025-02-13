import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllDataFromField } from "../../firebase/fieldOperations/fieldOperations";
import { addObjectInArrayInField } from "../../firebase/fieldOperations/arrayInFieldOperations";

// Async thunk to fetch categories
export const fetchCategoriesAsync = createAsyncThunk(
  "category/fetchCategoriesAsync",
  async (_, { rejectWithValue, getState }) => {
    const { category } = getState();
    if (category.status === "succeeded") return; // Avoid re-fetching if already loaded

    try {
      const categories = await getAllDataFromField("categories");
      return categories;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to add a category
export const addCategoryAsync = createAsyncThunk(
  "category/addCategoryAsync",
  async (categoryName, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      let nextId = state.category.categories.length + 1;
      let newCategory = { cid: nextId, cname: categoryName, date: Date.now() };

      // Add category to Firestore
      await addObjectInArrayInField("categories", newCategory);

      return newCategory; // Return to add to Redux state
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Categories
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchCategoriesAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Add Category
      .addCase(addCategoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCategoryAsync.fulfilled, (state, action) => {
        state.categories.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(addCategoryAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
