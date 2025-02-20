import React from "react"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"

const TopAppBar = ({handleShowModal}) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={()=>handleShowModal('drawer')}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Todo App
        </Typography>
        <Button color="inherit" onClick={()=>handleShowModal('categories')}>Category</Button>
        <Button color="inherit" onClick={()=>handleShowModal('addTodo')}>AddTodo</Button>
      </Toolbar>
    </AppBar>
  )
}

export default TopAppBar
