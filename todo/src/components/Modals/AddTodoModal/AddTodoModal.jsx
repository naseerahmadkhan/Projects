import * as React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import TextEditor from "../../TextEditor"
import Categories from "../../Categories"
import { useDispatch, useSelector } from "react-redux" // Correct import
import { getAllDataFromField } from "../../../firebase/fieldOperations/fieldOperations"
import { addTodo } from "../../../features/todos/todoSlice"
import { addObjectInArrayInField } from "../../../firebase/fieldOperations/arrayInFieldOperations"
import Loader from "../../Loader/Loader"
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
}

export default function AddTodoModal({ show, handleShowModal }) {
  const textEditorRef = React.useRef()
  const dispatch = useDispatch() // Call useDispatch hook outside of the function
  const todos = useSelector((state) => state.todo.todos)

  const todoRef = React.useRef()
  const [catId, setCatId] = React.useState()
  const [html, setHtml] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const sendDataToDbAndThenUpdateReduxStore = async (fieldName, payload) => {
    try {
      await addObjectInArrayInField(fieldName, payload)
      const resultData = await getAllDataFromField(fieldName)
      dispatch(addTodo(resultData))
    } catch (e) {
      logger.log("error:", e)
    }
  }

  const sendDataToDb = async (fieldName, payload) => {
    try {
      await addObjectInArrayInField(fieldName, payload)
    } catch (e) {
      logger.log("error:", e)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    let htmlContent = textEditorRef.current.getHTMLContent()
    setHtml(htmlContent)

    const todoPayload = {
      todoName: todoRef.current.value,
      date: Date.now(),
      tid: todos.length + 1,
      cid: catId,
      completed: false,
    }
    const contentPayload = {
      cid: catId,
      tid: todos.length + 1,
      html: htmlContent,
      date: Date.now(),
    }

    // Wait for the API call to complete before closing modal
    try {
      await sendDataToDb("contents", contentPayload)
      await sendDataToDbAndThenUpdateReduxStore("todos", todoPayload)
      setLoading(false)
      alert('sucessfully added!');
      handleShowModal() // Close modal only after API call is done
      textEditorRef.current.clearText()
    } catch (error) {
      console.error("Error saving todo:", error)
    }
    
 
  }

  return (
    <div>
      <Modal
        open={show}
        onClose={handleShowModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Todo
            </Typography>

            <IconButton aria-label="close" onClick={handleShowModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Loader open={loading} /> 
          <Stack sx={{ display: "flex" }} spacing={3}>
            <Categories categorySelected={(id) => setCatId(id)} />
            <TextField
              inputRef={todoRef}
              required
              id="todo-name"
              label="Todo Name"
              variant="filled"
              helperText={"Please enter a valid todo name (2-5 characters)."}
              slotProps={{
                minLength: 2,
              }}
            />
            <TextEditor ref={textEditorRef} />

            <Button
              fullWidth
              sx={{ height: 50 }}
              variant="contained"
              onClick={handleSubmit}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}
