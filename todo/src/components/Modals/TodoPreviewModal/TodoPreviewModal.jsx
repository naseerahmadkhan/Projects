import * as React from "react"
import Box from "@mui/material/Box"

import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import Chip from "@mui/material/Chip"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid2"
import { styled } from "@mui/material/styles"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import TodoEditModal from "./TodoEditModal"
import { deleteObjectInArrayInField } from "../../../firebase/fieldOperations/arrayInFieldOperations"
import { getAllDataFromField } from "../../../firebase/fieldOperations/fieldOperations"
import { addTodo } from "../../../features/todos/todoSlice"
import { useDispatch,useSelector } from 'react-redux'; 

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

const TodoPreviewModal = ({ show, handleShowModal, data }) => {
  const [isEditable, setIsEditable] = React.useState(false)
  const dispatch = useDispatch(); //


  const handleDeleteTodo = async()=>{
    console.log("delete todo")
    const tid = data.tid
    try{
      await deleteObjectInArrayInField('todos','tid',tid)
      const resultData = await getAllDataFromField('todos');
      dispatch(addTodo(resultData));
      handleCloseModal()

    }catch(e){
      alert(e)
    }

  }
 

  const handleCloseModal = () => {
    setIsEditable(false)
    handleShowModal()
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
            {!isEditable && (
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {data.todoName}
              </Typography>
            )}
            
            {isEditable && (
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Update
              </Typography>
            )}
           

            <IconButton aria-label="close" onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </Box>

          {!isEditable && <Stack sx={{ display: "flex" }} spacing={3}>
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Chip label={`${new Date(data.date)}`} />
                  <Chip
                    label={data.completed ? "Completed" : "Pending"}
                    variant="outlined"
                  />
                  <Stack direction="row">
                  <Chip
                    label="Edit Todo"
                    variant="outlined"
                    icon={<EditIcon />}
                    onClick={() => setIsEditable(true)}
                  />
                   <Chip
                    label="Delete Todo"
                    variant="outlined"
                    icon={<DeleteIcon />}
                    onClick={handleDeleteTodo}
                  />

                  </Stack>
                  
                  
                </Grid>
              </Box>
            </Box>
            <Box md={{ flexGrow: 1 }}>
              {data?.contents?.html && (
                <div
                  style={{ padding: "5%" }}
                  dangerouslySetInnerHTML={{ __html: data.contents.html }}
                />
              )}
            </Box>

            
          </Stack>}
              {isEditable && <TodoEditModal {...{ show, handleShowModal, data,setIsEditable }}/>}
        </Box>
      </Modal>
    </div>
  )
}

export default TodoPreviewModal
