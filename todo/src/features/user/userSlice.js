// categorySlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { logOut } from '../../firebase/userAuthOperations/userAuthOperations';


// ✅ Create async thunk for logout
export const handleLogout = createAsyncThunk(
    "user/handleLogout",
    async (_, { rejectWithValue }) => {
      try {
        console.log('logout calling...')
        await logOut(); // Call the actual async logout function
        return { username: null }; // Return new state
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: true,
    error: null,
    username:null
  },
  reducers: {
    setUser: (state, action) => {
        Object.assign(state, action.payload);// ✅ Merges only provided properties
        // return { ...state, ...action.payload }; // ✅ Merges only provided properties
    },
   
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogout.pending, (state) => {
        state.loading = true; // ✅ Show loading state while logging out
      })
      .addCase(handleLogout.fulfilled, (state) => {
        state.username = null;
        state.loading = false; // ✅ Set loading to false after success
      })
      .addCase(handleLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // ✅ Handle logout failure
      });
  },
});
 


export const { setUser } = userSlice.actions;
export default userSlice.reducer;