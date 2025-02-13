import React from "react"
import "./App.css"
const App = () => {

  let lesson = ['a','a','s','s','d','d','f','f']

  const renderKeys = (keys)=>{
    return(keys.map((item,index)=>{
      return <span key={index} className="text-black bg-amber-500 p-5 ">{item}</span>
    }))
  }
  return (
    <div className="bg-mint-500 h-svh flex justify-center items-center">
      <div className="bg-red-300" style={{ height: "90vh", width: "90vw" }}>
        <h1 className="ml-5 mt-5 text-4xl text-black">Typing Master</h1>

        <div className="mt-7">
        {renderKeys(lesson)}

        </div>
       
      </div>
    </div>
  )
}

export default App
