import * as React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import { addCategoryAsync  } from "../../../features/todos/categorySlice"
import { useDispatch } from 'react-redux'; // Correct import

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
}

export default function CategoryModal({ show, handleShowModal }) {
  const catRef = React.useRef();
  const [error, setError] = React.useState('');
  const dispatch = useDispatch(); // Call useDispatch hook outside of the function
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset previous error state
    setError('');

    let categoryName = catRef.current.value;    

    // Validate the category name
    if (categoryName.length < 2) {
      setError('Category name must be at least 2 characters long.');
      return;
    }
    // if (categoryName.length > 5) {
    //   setError('Category name cannot be more than 5 characters.');
    //   return;
    // }

    // Dispatch async action to add the category
    dispatch(addCategoryAsync(categoryName))
      .unwrap()  // Optionally, handle success or failure here
      .then(() => {
        handleShowModal();  // Close modal after successful addition
      })
      .catch((err) => {
        console.log(err);  // Handle error here
      });
    catRef.current.value = ""; // Clear the input field
    // handleShowModal(); // Close the modal
  }

  return (
    <div>
      <Modal
        open={show}
        onClose={handleShowModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create Category
            </Typography>

            <IconButton aria-label="close" onClick={handleShowModal}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Stack sx={{ display: "flex" }} spacing={3}>
            <TextField
              inputRef={catRef}
              required
              id="category-name"
              label="Category Name"
              variant="filled"
              helperText={error || 'Please enter a valid category name.'}
              error={!!error}
              slotProps={{
                minLength: 2,
              }}
            />

            <Button type="submit" fullWidth sx={{ height: 50 }} variant="contained">
              Create
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}
