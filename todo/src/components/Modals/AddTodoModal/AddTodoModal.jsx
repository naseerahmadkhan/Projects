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

   // Function to clear content and log it
   const clearText = () => {
    if (textEditorRef.current) {
      let htmlContent = textEditorRef.current.getHTMLContent()
      console.log(htmlContent)
      textEditorRef.current.clearText() // Clear the editor content
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

          <Stack sx={{ display: "flex" }} spacing={3}>
            <Categories categorySelected={(e)=>console.log(e)}/>
          <TextField
                        required
                        id="todo-name"
                        label="Todo Name"
                        variant="filled"
                        helperText={'Please enter a valid todo name (2-5 characters).'}
                       
                        slotProps={{
                          minLength: 2,
                          maxLength: 5,
                        }}
                      />
            <TextEditor ref={textEditorRef} />

            <Button fullWidth sx={{ height: 50 }} variant="contained">
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}
