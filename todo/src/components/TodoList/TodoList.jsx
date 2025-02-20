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
import { styled } from '@mui/material/styles';
import FolderIcon from '@mui/icons-material/Folder';
import ListItemButton from '@mui/material/ListItemButton';
import { useSelector,useDispatch } from 'react-redux';
import { addTodo } from '../../features/todos/todoSlice';
import { deleteObjectInArrayInField } from '../../firebase/fieldOperations/arrayInFieldOperations';
import { getAllDataFromField } from '../../firebase/fieldOperations/fieldOperations';
export default function TodoList({catId,setTodoForPreview}) {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch(); // Call useDispatch hook outside of the function

  const handleDeleteTodo = async(tid)=>{
    console.log("delete todo")
    try{
      await deleteObjectInArrayInField('todos','tid',tid)
      const resultData = await getAllDataFromField('todos');
      dispatch(addTodo(resultData));
      alert('deleted successfully')
    }catch(e){
      alert(e)
    }

  }


  return (
    <Box sx={{width:"80%"}}>
<Grid xs={12} md={12}>

<Typography id="modal-modal-title" variant="h6" component="h2">
    Todos
  </Typography>
<List>
  {
    todos
    .filter(todo => todo.cid === catId)
    .map((item,index)=>{
      return(
        <ListItem
        key={index}
      secondaryAction={
        <Stack direction={"row"} spacing={3}>
          <IconButton edge="end" aria-label="edit" onClick={()=>console.log(item.tid)}>
          <EditIcon />
        </IconButton>

        <IconButton edge="end" aria-label="delete" onClick={()=>handleDeleteTodo(item.tid)}>
          <DeleteIcon />
        </IconButton>

        </Stack>
        
      }
    >
      <ListItemButton onClick={()=>setTodoForPreview(item)}>
      <ListItemAvatar>
        <Avatar>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={item.todoName} 
        secondary={item.todoName ? 'Secondary text' : null}
      />


      </ListItemButton>
      
    </ListItem>
      )
    })
  }
</List>

</Grid>

</Box>
  );
}

