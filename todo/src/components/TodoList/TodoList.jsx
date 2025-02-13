import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { useSelector } from 'react-redux';

export default function TodoList() {
  // const list = Array.from({length:10},(_,i)=>i+1)
  const todos = useSelector((state) => state.todo.todos);
  return (
    <Box sx={{ width: '100%', maxWidth: 480, bgcolor: 'background.paper' }}>
      
        {todos.map((item,index)=>{
            return <List key={item.id}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PlaylistAddCheckIcon />
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </List>

          })
        }
        
      
      
     
    </Box>
  );
}