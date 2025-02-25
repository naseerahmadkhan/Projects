import React from 'react'
import Drawer from "@mui/material/Drawer"
import DrawerList from './DrawerList'

const NavigationDrawer = ({handleHideModal,handleShowModal,show}) => {
  const handleModal = (value)=>{
    handleShowModal(value)
    handleHideModal('drawer');
  }

  return (
    <Drawer open={show} onClose={()=>handleHideModal('drawer')}>
        <DrawerList handleDrawer={(value)=>{handleModal(value)}}/>
      </Drawer>
  )
}

export default NavigationDrawer