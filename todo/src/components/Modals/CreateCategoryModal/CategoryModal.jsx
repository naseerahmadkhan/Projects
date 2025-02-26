import * as React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import {
  addCategoryAsync,
  addCategory,
} from "../../../features/todos/categorySlice"
import { useDispatch, useSelector } from "react-redux" // Correct import
import {
  addObjectInArrayInField,
  updateObjectInArrayInField,
} from "../../../firebase/fieldOperations/arrayInFieldOperations"
import { getAllDataFromField } from "../../../firebase/fieldOperations/fieldOperations"
import logger from "../../../utils/logger"
import Loader from "../../Loader/Loader"
import { setState } from "../../../features/state/stateSlice"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  minWidth: 400,
  p: 4,
}

export default function CategoryModal() {
  let selectedCategory = 0;
  const dispatch = useDispatch() // Call useDispatch hook outside of the function
  const categories = useSelector((state) => state.categories.categories)
  const categoryStates = useSelector((state) => state.states)
  const state  = {
    loading : categoryStates.category.loading,
    show: categoryStates.category.show,
    error:categoryStates.category.error,
    selectedCategoryId: categoryStates.editCategory.selectedCategoryId,
    selectedCategoryName:categoryStates.editCategory.selectedCategoryName
  }

 

  const catRef = React.useRef(null)
  
  
  

  const checkMinLength = (categoryName, minLength) => {
    if (categoryName.length < minLength) {
      dispatch(setState({ category: { error: `Category name must be at least ${minLength} characters long.`,show:true } }));
      return false;  // 🚨 Stop further execution
    }
    return true; // ✅ Validation passed
  };
  

  const checkMaxLength = (categoryName, maxLength) => {
    // Validate the category name
    if (categoryName.length > minLength) {
      dispatch(setState({category:{error:`Category name must be at most ${maxLength} characters long.`}}))
      return
    }
  }

  const sendDataToDbAndThenUpdateReduxStore = async (categoryName) => {
    try {
      let nextId = categories.length + 1
      let payload = { cid: nextId, cname: categoryName, date: Date.now() }
      await addObjectInArrayInField("categories", payload)
      const fetchedCategoriesList = await getAllDataFromField("categories")
      dispatch(addCategory(fetchedCategoriesList))
    } catch (e) {
      logger.log("error:", e)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    dispatch(setState({ category: { loading: true, show: true } }));
  
    if (state.selectedCategoryName) {
      await handleUpdate();
    } else {
      await handleCreate();
    }
  };
  

  

  const fetchDatafromDbAndSaveInReduxStore = async (field, action) => {
    try {
      const resultData = await getAllDataFromField(field)
      dispatch(action(resultData))
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const handleUpdate = async () => {
    let updatedCategoryName = catRef.current.value
    
    if (!checkMinLength(updatedCategoryName, 2)) {
      return; // 🚨 Stop execution if validation fails
    }

    try {
      await updateObjectInArrayInField("categories", "cid", state.selectedCategoryId, {
        cname: updatedCategoryName,
        date: Date.now(),
      })
      await fetchDatafromDbAndSaveInReduxStore("categories", addCategory)
     
      alert("data updated successfully!")
      dispatch(setState({ 
        category: { loading: false },
        editCategory:{selectedCategoryId:null,selectedCategoryName:""}, 
      }));
    } catch (e) {
      alert(e)
    }
  }

  // Handle form submission
  const handleCreate = async () => {
   
    let categoryName = catRef.current.value
    if (!checkMinLength(categoryName, 2)) {
      return; // 🚨 Stop execution if validation fails
    }
   
    await sendDataToDbAndThenUpdateReduxStore(categoryName)
    catRef.current.value = "" // Clear the input field
    alert("data added successfully!")
    dispatch(setState({ category: { loading: false } }));
  }

  return (
    <div>
    <Loader open={state.loading} />
      <Modal
        open={state.show}
        onClose={()=>dispatch(setState({category:{show:false}}))}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         
        <Box sx={style} component="form" onSubmit={handleSubmit}>
        
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {state.selectedCategoryName ? "Update Category" : "Create Category"}
            </Typography>

            <IconButton aria-label="close" onClick={()=>dispatch(setState({category:{show:false}}))}>
              <CloseIcon />
            </IconButton>
          </Box>
          
          <Stack sx={{ display: "flex" }} spacing={3}>
            <TextField
              inputRef={catRef}
              required
              defaultValue={state.selectedCategoryName}
              id="category-name"
              label="Category Name"
              variant="filled"
              helperText={state.error || "Please enter a valid category name."}
              error={!!state.error}
              slotProps={{
                minLength: 2,
              }}
            />

            <Button
              type="submit"
              fullWidth
              sx={{ height: 50 }}
              variant="contained"
            >
              {state.selectedCategoryName ? "Update" : "Create"}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}
