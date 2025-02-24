import React from "react"
import Switch from "@mui/material/Switch"
import { FormControl, FormGroup, FormControlLabel } from "@mui/material"
import TextEditor from "../../TextEditor"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import logger from "../../../utils/logger"
import { updateObjectInArrayInField } from "../../../firebase/fieldOperations/arrayInFieldOperations"
import { useDispatch,useSelector } from 'react-redux'; 
import { getAllDataFromField } from "../../../firebase/fieldOperations/fieldOperations"
import { addTodo } from "../../../features/todos/todoSlice"

const TodoEditModal = ({ data,handleShowModal,setIsEditable }) => {
  const todoRef = React.useRef(null)
  const textEditorRef = React.useRef(null)
  const toogleRef = React.useRef(null)
  const dispatch = useDispatch(); // Call useDispatch hook outside of the function


  // Set value when edit mode is enabled
  React.useEffect(() => {
    if (todoRef.current) {
      todoRef.current.value = data.todoName // Set initial value
    }

    if (data?.contents?.html && textEditorRef.current) {
      textEditorRef.current.setHTMLContent(data.contents.html)
    }
  }, [data]) // Depend on isEditable

  const handleUpdate = async() => {
    const updatedTodoName = todoRef.current.value
    const updateHtml = textEditorRef.current.getHTMLContent()
    const isCompleted = toogleRef.current.checked
    console.log("data", data)
    const updatedTodo = {completed:isCompleted,todoName:updatedTodoName,date: Date.now()}
    try{
        const tid = data.tid
        await updateObjectInArrayInField('todos','tid',tid,updatedTodo)
        await updateObjectInArrayInField('contents','tid',tid,{html:updateHtml})
        const resultData = await getAllDataFromField('todos');
      dispatch(addTodo(resultData));
        setIsEditable(false);
    handleShowModal();

    }catch(e){
        alert(e)
    }
    

  }

 

  return (
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
  )
}

export default TodoEditModal
