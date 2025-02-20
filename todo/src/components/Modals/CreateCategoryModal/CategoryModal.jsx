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
import { addObjectInArrayInField,updateObjectInArrayInField} from "../../../firebase/fieldOperations/arrayInFieldOperations"
import { getAllDataFromField } from "../../../firebase/fieldOperations/fieldOperations"
import logger from "../../../utils/logger"
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '50vw',
  bgcolor: "background.paper",
  boxShadow: 24,
  minWidth:400,
  p: 4,
}

export default function CategoryModal({ show, handleShowModal,handleHideModal,state,setState }) {
  const catRef = React.useRef(null);
 
  const [error, setError] = React.useState('');
  const dispatch = useDispatch(); // Call useDispatch hook outside of the function
  const categories = useSelector((state) => state.categories.categories);
  let currentCategoryName = null
  let catID;
  let selectedCategory;
  if(state.category.selectedCatId){
    catID = state.category.selectedCatId
    selectedCategory = categories.filter((cat)=>cat.cid ==catID )
    currentCategoryName = selectedCategory[0].cname 
  }
  
  

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

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(currentCategoryName){
      await handleUpdate()
    }else{
      await handleCreate()
    }
  }

  const fetchDatafromDbAndSaveInReduxStore = async (field, action) => {
    try {
      const resultData = await getAllDataFromField(field)
      dispatch(action(resultData))
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const handleUpdate = async()=>{
    setError(''); // Reset previous error state
    let updatedCategoryName = catRef.current.value; 
    console.log('update>>>>',catID,selectedCategory,updatedCategoryName)

    checkMinLength(updatedCategoryName,2)
    try{
      await updateObjectInArrayInField('categories','cid',catID,{cname:updatedCategoryName,date: Date.now()})
      await fetchDatafromDbAndSaveInReduxStore("categories", addCategory)
      catRef.current.value = ""; // Clear the input field
    handleHideModal();
    alert('data updated successfully!')
    }catch(e){
      alert(e)
    }

  }

  // Handle form submission
  const handleCreate = async() => {
    setError(''); // Reset previous error state
    let categoryName = catRef.current.value;    
    checkMinLength(categoryName,2)
    // checkMaxLength(categoryName,maxLength=5)
    // sendDataToReduxStoreAndThenSaveInDB(categoryName)
    await sendDataToDbAndThenUpdateReduxStore(categoryName)
    catRef.current.value = ""; // Clear the input field
    handleHideModal();
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
             { currentCategoryName ?("Update Category"):("Create Category")}
            </Typography>

            <IconButton aria-label="close" onClick={handleHideModal}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Stack sx={{ display: "flex" }} spacing={3}>
            <TextField
              inputRef={catRef}
              required
              defaultValue={currentCategoryName}
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
            { currentCategoryName ?("Update"):("Create")}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  )


}