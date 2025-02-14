import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { useSelector } from 'react-redux';

export default function TodoList({catId}) {
  // const list = Array.from({length:10},(_,i)=>i+1)
  const todos = useSelector((state) => state.todo.todos);
  console.log('todos>>>',todos)
  return (
    <Box sx={{ width: '100%', maxWidth: 480, bgcolor: 'background.paper' }}>
      
        {todos
        .filter(todo => todo.cid === catId)
        .map((item,index)=>{
            return <List key={index}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PlaylistAddCheckIcon />
                </ListItemIcon>
                <ListItemText primary={item.todoName} />
              </ListItemButton>
            </ListItem>
          </List>

          })
        }


        
      
      
     
    </Box>
  );
}