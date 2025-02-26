import React from 'react'
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import Autocomplete from "@mui/material/Autocomplete"
import { IconButton, TextField} from "@mui/material";
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import ListItemButton from '@mui/material/ListItemButton';
import { useDispatch, useSelector } from "react-redux" 
import { setState } from '../../features/state/stateSlice';
const CategoryList = ({handleDeleteCategory}) => {
  const dispatch = useDispatch() 

  const list = useSelector((state) => state.categories.categories) || []
 

  const handleEdit = (cid)=>{
    console.log("edit",cid)
    const selectedCategory = list.filter((item)=>item.cid === cid)
    dispatch(setState({
      editCategory:{selectedCategoryId:cid,selectedCategoryName:selectedCategory[0].cname},
      category:{show:true}
    }))

  }
 
  return (
    <Box sx={{width:"80%"}}>
          <Grid xs={12} md={12}>
          
          
          <List>
            {
              list.map((category,index)=>{
                return(
                  <ListItem
                  key={index}
                secondaryAction={
                  <Stack direction={"row"} spacing={3}>
                    <IconButton edge="end" aria-label="edit" onClick={()=>handleEdit(category.cid)}>
                    <EditIcon />
                  </IconButton>

                  <IconButton edge="end" aria-label="delete" onClick={()=>handleDeleteCategory(category.cid)}>
                    <DeleteIcon />
                  </IconButton>

                  </Stack>
                  
                }
              >
                <ListItemButton onClick={() => dispatch(setState({selectedCategory:{selectedCategoryId:category.cid}}))}>
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
              
                 <ListItemText
                  primary={category.cname}
                  secondary={category.cname ? 'Secondary text' : null}
                />


                </ListItemButton>
                
              </ListItem>
                )
              })
            }
          </List>
        
      </Grid>

          </Box>
  )
}

export default CategoryList