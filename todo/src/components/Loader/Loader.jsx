import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = ({open}) => {
  return (
    <Backdrop
    sx={(theme) => ({ color: '#fff', zIndex: 999999 })}
    open={open}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
  )
}

export default Loader