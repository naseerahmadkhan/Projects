import React, { useEffect, useState, useRef,useLayoutEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateObjectInArrayInField,getObjectInArrayInFieldByCondition } from "../../../firebase/fieldOperations/arrayInFieldOperations"
import { getAllDataFromField } from "../../../firebase/fieldOperations/fieldOperations"
import { addTodo } from "../../../features/todos/todoSlice"
import { setState } from "../../../features/state/stateSlice"
import { Modal, TextField, Typography, IconButton, Button, Stack, Box, FormGroup, FormControlLabel, Switch } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import Loader from "../../Loader/Loader"
import TextEditor from "../../TextEditor"

const TodoEditModal = () => {
  const todoRef = useRef(null)
  const textEditorRef = useRef(null)
  const toggleRef = useRef(null)
  const dispatch = useDispatch()

  const editToDo = useSelector((state) => state.states.editToDo)
  const toDoList = useSelector((state) => state.todo.todos)

  const [loading, setLoading] = useState(false)
  const [todoData, setTodoData] = useState(null)


  const getHtmlContent = async(tid)=>{
    let htmlContentResult = null
    try {
      htmlContentResult = await getObjectInArrayInFieldByCondition(
        "contents",
        "tid",
        "==",
        tid
      )
      return htmlContentResult[0] 
    
    } catch (e) {
      console.log(e)
    }
  }

  const handleShowModal = () => {
    setTodoData(null)
    dispatch(setState({ editToDo: { show: false } }))
  }

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

  useEffect(() => {
    if (!editToDo.show) return;
  
    setLoading(true);
  
    (async () => {
      const foundTodo = toDoList.find((item) => item.tid === editToDo.selectedTodoId) || null;
      const htmlObject = await getHtmlContent(editToDo.selectedTodoId); // ✅ Wait for async function
  
      
  
      console.log("*********full todo", foundTodo);
      console.log("*********html", htmlObject.html);
  
      const fullTodo = { ...foundTodo, contents: htmlObject }; // Fix key name
      
  
      // ✅ Wait for state update before modifying the text editor
      setTimeout(() => {
        if (textEditorRef.current) {
          console.log("✅ Setting editor content...");
          textEditorRef.current.setHTMLContent(htmlObject.html || "<p>hello world</p>");
        }
      }, 10); // Small delay to ensure editor is ready
      setTodoData(fullTodo);
  
      setLoading(false);
    })();
  }, [editToDo, toDoList]);
  
  
  
  


  const handleUpdate = async () => {
    if (!todoData) return

    setLoading(true)
    try {
      const updatedTodoName = todoRef.current.value
      const updatedHtml = textEditorRef.current.getHTMLContent()
      const isCompleted = toggleRef.current.checked

      const updatedTodo = {
        completed: isCompleted,
        todoName: updatedTodoName,
        date: Date.now(),
      }

      await updateObjectInArrayInField("todos", "tid", todoData.tid, updatedTodo)
      await updateObjectInArrayInField("contents", "tid", todoData.tid, { html: updatedHtml })

      const resultData = await getAllDataFromField("todos")
      dispatch(addTodo(resultData))

      alert("Successfully updated!")
      handleShowModal()
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Loader open={loading} />
      {todoData && (
        <Modal open={editToDo.show} onClose={handleShowModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography id="modal-modal-title" variant="h6">
                Update Todo
              </Typography>
              <IconButton aria-label="close" onClick={handleShowModal}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Stack spacing={3}>
              <TextField inputRef={todoRef} required id="todo-name" label="Todo Name" variant="filled" defaultValue={todoData.todoName}/>
              <TextEditor ref={textEditorRef} />
              <FormGroup>
                <FormControlLabel control={<Switch inputRef={toggleRef} />} label="Completed" />
              </FormGroup>
              <Button fullWidth sx={{ height: 50 }} variant="contained" onClick={handleUpdate}>
                Update
              </Button>
            </Stack>
          </Box>
        </Modal>
      )}
    </div>
  )
}

export default TodoEditModal


/* 
return (
  <div>
    <Loader open={loading}/>
    <Modal
      open={show}
      onClose={handleShowModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
       <Box sx={{ display: "flex", flexDirection: "column" }}>
    <FormControl>
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
    </FormControl>

    <FormGroup>
      <FormControlLabel
        control={
          <Switch defaultChecked={data.completed} inputRef={toogleRef} />
        }
        label="Completed"
      />
    </FormGroup>
    <TextEditor ref={textEditorRef} />
    <Button type="submit" onClick={() => handleUpdate()}>
      Update
    </Button>
  </Box>


    </Modal>

  </div>
  
 
) */