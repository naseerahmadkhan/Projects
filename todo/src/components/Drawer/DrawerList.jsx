import React from 'react'
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { useSelector, useDispatch } from "react-redux"
import { setState } from '../../features/state/stateSlice'
const DrawerList = () => {
  const dispatch = useDispatch()
  return (
    <Box
          sx={{ width: 250 }}
          role="presentation"
          
        >
          <List>
          <ListItem key={'1'} disablePadding>
                <ListItemButton  onClick={()=>dispatch(setState({category:{show:true}}))}>
                  <ListItemIcon>
                    <CreateNewFolderIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"Add Category"} />
                </ListItemButton>
              </ListItem>
          </List>
          <Divider />
          <List>
          <ListItem key={'2'} disablePadding>
                <ListItemButton onClick={()=>dispatch(setState({addToDo:{show:true}}))}>
                  <ListItemIcon>
                    <NoteAddIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"Add Todo"} />
                </ListItemButton>
              </ListItem>
          </List>
        </Box>
  )
}

export default DrawerList