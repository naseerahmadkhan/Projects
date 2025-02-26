import React from 'react'
import Drawer from "@mui/material/Drawer"
import DrawerList from './DrawerList'
import { useSelector, useDispatch } from "react-redux"
import { setState } from '../../features/state/stateSlice'
const NavigationDrawer = () => {

  const states = useSelector((state) => state.states)
  const dispatch = useDispatch()

  const show = {
    drawer: states.drawer.show
  }
  

  return (
    <Drawer open={show.drawer} onClose={()=>dispatch(setState({drawer:{show:false}}))}>
        <DrawerList/>
      </Drawer>
  )
}

export default NavigationDrawer