import React, {useEffect} from "react"

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

import { Button } from "@mui/material"

import Typography from "@mui/material/Typography"

import CategoryList from "../components/CategoryList"
import Loader from "../components/Loader/Loader"
import { setState } from "../features/state/stateSlice"
function Home({ logout }) {
  const modals = {
    categories: false,
    addTodo: false,
    drawer: false,
    todoPreview: false,
  }

  const [showModal, setShowModal] = React.useState(modals)
  const [selectedTodo, setSelectedTodo] = React.useState({})
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todo.todos)
  
  const [loading, setIsLoading] = React.useState(false)
  const statesCollection = useSelector((state) => state.states)

  const states = {
    showDrawer: statesCollection.drawer.show,
    showCategory: statesCollection.category.show,
    selectedCategoryId:statesCollection.selectedCategory.selectedCategoryId
  }




  const handleDeleteCategory = async (catId) => {
    if(confirm('Are you sure you want to delete todo') === true){
      setIsLoading(true)
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
    setIsLoading(false)
    }
    
  }

  const handleTodoPreview = async (data) => {
    setIsLoading(true)
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
      setIsLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  const handleModal = (target) => {
    setShowModal((prev) => ({ ...prev, [target]: !prev[target] }))
  }

  

  const fetchDatafromDbAndSaveInReduxStore = async (field, action) => {
    try {
      setIsLoading(true)
      const resultData = await getAllDataFromField(field)
      dispatch(action(resultData))
      setIsLoading(false)
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
      <Loader open={loading} />
      <AppBar
       
      />

      <NavigationDrawer
       
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
        
      />

      <Box sx={{ marginTop: "5%", display: "flex", flexDirection: "column" }}>
        <Stack sx={{ alignItems: "center" }} spacing={3}>
          <Button
            variant="contained"
            disabled={states.selectedCategoryId  ? false : true}
            onClick={() => dispatch(setState({selectedCategory:{selectedCategoryId:null}}))}
          >
            Back
          </Button>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {!states.selectedCategoryId ? "Categories" : "Todos"}
          </Typography>
          {!states.selectedCategoryId && (
            <CategoryList
              {...{
               
                handleDeleteCategory,
                
              }}
            />
          )}
          <TodoList catId={states.selectedCategoryId} setTodoForPreview={handleTodoPreview} />
        </Stack>
      </Box>
    </Box>
  )
}

export default Home
