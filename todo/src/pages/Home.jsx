import React, { useState, useEffect } from "react"

import "../styles/App.css"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import AppBar from "../components/AppBar"
import Categories from "../components/Categories"
import AddTodoModal from "../components/Modals/AddTodoModal"
import CategoryModal from "../components/Modals/CreateCategoryModal"
import TodoList from "../components/TodoList"
import NavigationDrawer from "../components/Drawer/NavigationDrawer"
import TodoPreviewModal from "../components/Modals/TodoPreviewModal/TodoPreviewModal"

import { useSelector, useDispatch } from "react-redux"
import { addCategory } from "../features/todos/categorySlice"
import { getAllDataFromField } from "../firebase/fieldOperations/fieldOperations"
import { addTodo } from "../features/todos/todoSlice"
import {
  getObjectInArrayInFieldByCondition,
  deleteObjectInArrayInField,
} from "../firebase/fieldOperations/arrayInFieldOperations"
import { Button } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import Autocomplete from "@mui/material/Autocomplete"
import { IconButton, TextField, InputAdornment } from "@mui/material";

function Home() {
  const modals = {
    categories: false,
    addTodo: false,
    drawer: false,
    todoPreview: false,
  }
  const [showModal, setShowModal] = React.useState(modals)
  const [categories, setCategories] = React.useState(null)
  const [selectedTodo, setSelectedTodo] = React.useState({})
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todo.todos)
  const catList = useSelector((state) => state.categories.categories) || []

  const handleDeleteCategory = async () => {
    let filteredTodos = todos.filter((item) => item.cid == categories)
    if (filteredTodos.length == 0) {
      try {
        await deleteObjectInArrayInField("categories", "cid", categories)
        await fetchDatafromDbAndSaveInReduxStore("categories", addCategory)
      } catch (e) {
        alert(e)
      }
    } else {
      alert("first remove todos from categories")
    }
  }

  const handleTodoPreview = async (data) => {
    const { tid } = data
    let htmlContentResult = null
    try {
      htmlContentResult = await getObjectInArrayInFieldByCondition(
        "contents",
        "tid",
        "==",
        tid
      )
      const completeTodo = { ...data, contents: htmlContentResult[0] }
      console.log("complete todo", completeTodo)
      setSelectedTodo(completeTodo)
      handleModal("todoPreview")
    } catch (e) {
      console.log(e)
    }
  }

  const handleModal = (target) => {
    setShowModal((prev) => ({ ...prev, [target]: !prev[target] }))
  }

  const fetchDatafromDbAndSaveInReduxStore = async (field, action) => {
    try {
      const resultData = await getAllDataFromField(field)
      dispatch(action(resultData))
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  useEffect(() => {
    fetchDatafromDbAndSaveInReduxStore("categories", addCategory)
    fetchDatafromDbAndSaveInReduxStore("todos", addTodo)
  }, [dispatch])

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

      <TodoPreviewModal
        show={showModal.todoPreview}
        data={selectedTodo}
        handleShowModal={() => handleModal("todoPreview")}
      />
      <CategoryModal
        show={showModal.categories}
        handleShowModal={() => handleModal("categories")}
      />

      <Box sx={{ padding: "25px", display: "flex", flexDirection: "column" }}>
        <Stack sx={{ alignItems: "center" }} spacing={3}>
          <Box sx={{ display: "flex", width: 2/3, gap: 1 }}>
            <Box sx={{ display: "flex", flex: 1,justifyContent:'center', marginTop: 10 }}>
              <Autocomplete
                disablePortal
                options={catList || []} // Ensure options is always an array
                getOptionLabel={(option) => (option?.cname ? option.cname  : "")} // Prevent errors
                value={catList.find((cat) => cat.cid === categories) || null} // Always return an object or null
                onChange={(event, value) => {
                  setCategories(value ? value.cid : null) // Ensure controlled state
                  console.log("Selected Category:", value)
                }}
                sx={{ width: "80%" }} // Make Autocomplete full width
                renderInput={(params) => (
                  <TextField {...params} label="Categories" />
                  
                )}
              />
              {categories &&  <IconButton aria-label="close" onClick={()=>console.log(categories)}>
              <EditIcon />
            </IconButton>}

            {categories && <IconButton aria-label="close" onClick={()=>handleDeleteCategory()}>
              <DeleteIcon />
            </IconButton>}
             
            </Box>
          </Box>

          <TodoList catId={categories} setTodoForPreview={handleTodoPreview} />
        </Stack>
      </Box>
    </Box>
  )
}

export default Home
