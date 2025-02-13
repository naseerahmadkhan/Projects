import React from 'react'
import Drawer from "@mui/material/Drawer"
import DrawerList from './DrawerList'

const NavigationDrawer = ({handleDrawer,show}) => {
  

  return (
    <Drawer open={show} onClose={()=>handleDrawer('drawer')}>
        <DrawerList handleDrawer={handleDrawer}/>
      </Drawer>
  )
}

export default NavigationDrawer