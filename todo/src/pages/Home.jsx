import React, { useState, useEffect } from "react"

import "../styles/App.css"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import AppBar from "../components/AppBar"
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
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import Autocomplete from "@mui/material/Autocomplete"
import { Button, IconButton, TextField } from "@mui/material"

import Grid from "@mui/material/Grid2"
import Typography from "@mui/material/Typography"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Avatar from "@mui/material/Avatar"
import { styled } from "@mui/material/styles"
import FolderIcon from "@mui/icons-material/Folder"
import ListItemButton from "@mui/material/ListItemButton"
import CategoryList from "../components/CategoryList"
function Home() {
  const modals = {
    categories: false,
    addTodo: false,
    drawer: false,
    todoPreview: false,
  }

  
  const [showModal, setShowModal] = React.useState(modals)
  const [catId, setCatId] = React.useState(null)
  const [selectedTodo, setSelectedTodo] = React.useState({})
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todo.todos)
  const catList = useSelector((state) => state.categories.categories) || []
  const [isEditable,setIsEditable] = React.useState({category:{selectedCatId:null}})

 
  

  const handleEditCategory = async(cid)=>{
    setIsEditable((prev)=>({category:{selectedCatId:cid}}))
    handleModal("categories")
  }

  const handleDeleteCategory = async (catId) => {
    let filteredTodos = todos.filter((item) => item.cid == catId)
    if (filteredTodos.length == 0) {
      try {
        await deleteObjectInArrayInField("categories", "cid", catId)
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
      setSelectedTodo(completeTodo)
      handleModal("todoPreview")
    } catch (e) {
      console.log(e)
    }
  }

  const handleModal = (target) => {
    
    setShowModal((prev) => ({ ...prev, [target]: !prev[target] }))
  }

  const handleHideModal  = (target) => {
    setIsEditable((prev)=>({category:{selectedCatId:null}}))
    setShowModal((prev) => ({ ...prev, [target]: false }))
  }

  const handleShowModal  = (target) => {
    
    setShowModal((prev) => ({ ...prev, [target]: true }))
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
      <AppBar 
      handleShowModal={(value)=>handleShowModal(value)} 
      handleHideModal={(value)=>handleHideModal(value)} 
      />

      <NavigationDrawer
        show={showModal.drawer}
        handleHideModal={()=>handleHideModal("drawer")} 
        handleShowModal={()=>handleShowModal("drawer")} 
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
        handleHideModal={()=>handleHideModal("categories")}
        catId={catId}
        state={isEditable}
        setState={setIsEditable}
      />

      <Box sx={{ marginTop: "5%", display: "flex", flexDirection: "column" }}>
        <Stack sx={{ alignItems: "center" }} spacing={3}>
          <Button variant="contained" onClick={() => setCatId(null)}>
            Back
          </Button>
          <CategoryList {...{ catList, setCatId, handleDeleteCategory,handleEditCategory}} />
          <TodoList catId={catId} setTodoForPreview={handleTodoPreview} 
          />
        </Stack>
      </Box>
    </Box>
  )
}

export default Home
