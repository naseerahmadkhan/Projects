// categorySlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const categorySlice = createSlice({
  name: 'states',
  initialState: {
    todo:{loading:false,show:false,selectedTodoId:null},
    category:{loading:false,show:false,selectedCategoryId:null},
    drawer:{show:false},
  },
  reducers: {
    setState: (state, action) => {
      
    },
   
  },

});

export const {  } = categorySlice.actions;
export default categorySlice.reducer;