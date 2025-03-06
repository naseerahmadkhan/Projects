// categorySlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const stateSlice = createSlice({
  name: 'states',
  initialState: {
    drawer:{show:false},
    addToDo:{loading:false,show:false,selectedTodoId:null},
    editToDo:{loading:false,show:false,selectedTodoId:null},
    category:{loading:false,show:false,error:""},
    selectedCategory:{selectedCategoryId:null},
    editCategory:{selectedCategoryId:null,selectedCategoryName:""},
  },
  reducers: {
    setState: (state, action) => {
        Object.assign(state, action.payload);// ✅ Merges only provided properties
    },
   
  },

});

export const { setState } = stateSlice.actions;
export default stateSlice.reducer;