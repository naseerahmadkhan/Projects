import React from "react"
import "./style.css"
const Key = ({values}) => {

    const generateRow = ()=>{
        return values.map((item,index)=>{
            console.log('>>>',typeof item ==='object')
            if(typeof item ==='object'){
                return <div className="box" key={index}>
                    <div>{item.first}</div>
                    <div>{item.last}</div>
                </div>       
            }
             return <div className="box" key={index}>{item}</div>
         })

    }
   

  return (
    <div className="row">
  
    {generateRow()}
   
    
  </div>
  )
}

export default Key
