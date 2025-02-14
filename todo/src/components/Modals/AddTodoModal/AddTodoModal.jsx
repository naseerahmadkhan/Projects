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

import { getAllDataFromField } from "../../../firebase/fieldOperations/fieldOperations"
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
  const todoRef = React.useRef()
  const [todo,setTodo] = React.useState({})
  const [html,setHtml] = React.useState("")

  const handleSubmit = () => {
    let htmlContent = textEditorRef.current.getHTMLContent();
    setHtml(htmlContent);

  
   // Then, update `todo` state and call API inside the callback
  setTodo((prev) => {
    const updatedTodo = { ...prev, todo: todoRef.current.value };
    
    console.log("***", updatedTodo, htmlContent); // Logs latest values
    // Call API with updated values

    return updatedTodo; // Return updated state
  });
    textEditorRef.current.clearText();
    console.log('***',todo,html)
  };

  const getData = async()=>{
    return await getAllDataFromField('todo');
  }

  React.useEffect(()=>{
    let res = getData();
    console.log(JSON.stringify(res))
    if(res){
      console.log('correct')
    }else{
      console.log('incorrect')
    }
    
  },[])
 
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

          <Stack sx={{ display: "flex" }} spacing={3}>
            <Categories categorySelected={(val) => setTodo((prev)=>({...prev,cid:val}))} />
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

            <Button fullWidth sx={{ height: 50 }} variant="contained" onClick={handleSubmit}> 
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}
