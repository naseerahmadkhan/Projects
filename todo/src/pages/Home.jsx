import React, { useState, useEffect } from "react";

import "../styles/App.css"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import AppBar from "../components/AppBar"
import Categories from "../components/Categories"
import AddTodoModal from "../components/Modals/AddTodoModal"
import CategoryModal from "../components/Modals/CreateCategoryModal"
import TodoList from "../components/TodoList"
import NavigationDrawer from "../components/Drawer/NavigationDrawer"

import { useSelector, useDispatch } from "react-redux";
import { addCategory } from "../features/todos/categorySlice"
import { getAllDataFromField } from "../firebase/fieldOperations/fieldOperations";
import { addTodo } from "../features/todos/todoSlice";

function Home() {
  const modals = {
    categories: false,
    addTodo: false,
    drawer: false,
  }
  const [showModal, setShowModal] = React.useState(modals)
  const [categories, setCategories] = React.useState(null)
  const dispatch = useDispatch();

 

  const handleModal = (target) => {
    setShowModal((prev) => ({ ...prev, [target]: !prev[target] }))
  }

  const fetchDatafromDbAndSaveInReduxStore = async (field, action) => {
    try {
      const resultData = await getAllDataFromField(field);
      dispatch(action(resultData));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchDatafromDbAndSaveInReduxStore("categories", addCategory); 
    fetchDatafromDbAndSaveInReduxStore("todo", addTodo); 
  }, [dispatch]);

  return (
    <Box>
      <AppBar handleModal={(targetName) => handleModal(targetName)} />

      <NavigationDrawer
        show={showModal.drawer}
        handleDrawer={() => handleModal("drawer")}
      />
      <AddTodoModal
        show={showModal.addTodo}
        handleShowModal={() => handleModal("addTodo")}
      />
      <CategoryModal
        show={showModal.categories}
        handleShowModal={() => handleModal("categories")}
      />

      <Box sx={{ padding: "25px", display: "flex", flexDirection: "column" }}>
        <Stack sx={{ alignItems: "center" }} spacing={3}>
          <Box sx={{ display: "flex", width: 2 / 3, gap: 1 }}>
            <Box sx={{ flex: 1,marginTop:10 }}>
              <Categories categorySelected={(id)=>setCategories(id)}/>
            </Box>
          </Box>

          <TodoList catId={categories}/>
        </Stack>
      </Box>
    </Box>
  )
}

export default Home
