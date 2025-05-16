import React from 'react'
import Key from '../key/key'
import './styles.css'
const Keyboard = () => {
    const row1 = ['A','S','D','F','G','H','J','K','L',{first:';',last:':'}]
  return (
    <div className='keyboard'>
      <Key values={row1}/>
     
    </div>
  )
}

export default Keyboard