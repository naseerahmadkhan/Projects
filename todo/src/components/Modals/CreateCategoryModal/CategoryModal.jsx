import * as React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import { addCategoryAsync, addCategory  } from "../../../features/todos/categorySlice"
import { useDispatch,useSelector } from 'react-redux'; // Correct import
import { addObjectInArrayInField,} from "../../../firebase/fieldOperations/arrayInFieldOperations"
import { getAllDataFromField } from "../../../firebase/fieldOperations/fieldOperations"
import logger from "../../../utils/logger"

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
  const categories = useSelector((state) => state.categories.categories);
  

  const checkMinLength = (categoryName,minLength)=>{
    // Validate the category name
    if (categoryName.length < minLength) {
      setError(`Category name must be at least ${minLength} characters long.`);
      return;
    }
  }

  const checkMaxLength = (categoryName,maxLength)=>{
    // Validate the category name
    if (categoryName.length > minLength) {
      setError(`Category name must be at most ${maxLength} characters long.`);
      return;
    }
  }

  const sendDataToReduxStoreAndThenSaveInDB = (categoryName)=>{
    // Dispatch async action to add the category-----------
    dispatch(addCategoryAsync(categoryName))
      .unwrap()  // Optionally, handle success or failure here
      .then(() => {
        handleShowModal();  // Close modal after successful addition
      })
      .catch((err) => {
        console.log(err);  // Handle error here
      });
      // ------------------------------------------------

  }

  const sendDataToDbAndThenUpdateReduxStore = async(categoryName)=>{
    try{
      let nextId = categories.length +1
      let payload = { cid: nextId, cname: categoryName, date: Date.now() };
      await addObjectInArrayInField('categories', payload);
      const fetchedCategoriesList = await getAllDataFromField("categories");
      dispatch(addCategory(fetchedCategoriesList));
    }catch(e){
      logger.log('error:',e);
    }
  }


  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    setError(''); // Reset previous error state
    let categoryName = catRef.current.value;    
    checkMinLength(categoryName,2)
    // checkMaxLength(categoryName,maxLength=5)
    // sendDataToReduxStoreAndThenSaveInDB(categoryName)
    await sendDataToDbAndThenUpdateReduxStore(categoryName)
    catRef.current.value = ""; // Clear the input field
    handleShowModal();
    alert('data added successfully!')
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
