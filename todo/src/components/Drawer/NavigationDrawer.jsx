import React from 'react'
import Drawer from "@mui/material/Drawer"
import DrawerList from './DrawerList'

const NavigationDrawer = ({handleHideModal,handleShowModal,show}) => {
  

  return (
    <Drawer open={show} onClose={()=>handleHideModal('drawer')}>
        <DrawerList handleDrawer={handleShowModal}/>
      </Drawer>
  )
}

export default NavigationDrawer