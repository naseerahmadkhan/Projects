import React, { useState, useEffect,Suspense } from "react";
import Home from "./pages/Home"
import store from "./redux/store"
import { Provider } from "react-redux"
import {checkUserStatus,handleLoginWithUserAndPassword,logOut} from './firebase/userAuthOperations/userAuthOperations'
import {
          addObjectInArrayInField,
          updateObjectInArrayInField,
          deleteObjectInArrayInField,
          getObjectInArrayInFieldByCondition
         } from './firebase/fieldOperations/arrayInFieldOperations'

import {
          getAllDataFromField,
          getDataFromFieldById,
          getAllFieldsWithData,
          addFieldInDB,
          updateAllDataInField,
          removeFieldWithData

} from './firebase/fieldOperations/fieldOperations'   

import {getAllDocumentsFromCollection} from './firebase/collectionOperations/collectionOperations'
import {
  getDocumentFields,
  addEmptyDocumentWithCustomId,
  deleteDocument,
  checkAndCreateEmptyDocument
} from './firebase/documentOperations/documentOperations'

import Login from "./pages/login";
import Loader from "./components/Loader/Loader";
function App() {


  // addObjectInArrayInField('category',{id:5,name:'next.js'})
  // updateObjectInArrayInField('category','cid',5,{name:'***js',active:true})
  // deleteObjectInArrayInField('categories','cid',categories)
  // getObjectInArrayInFieldByCondition('category','completed','==',true)


  // getAllDataFromField('category')
  // getDataFromFieldById('category',2)
  // getAllFieldsWithData()
  // addFieldInDB('images', {id:1,img:'https://'});
  // updateAllDataInField('images',[{img:'final'}])
  // removeFieldWithData('images')
  
  checkUserStatus()
  // getAllDocumentsFromCollection('todo')
  // getDocumentFields('todolist','todo')
  // addEmptyDocumentWithCustomId('todo','naseer4uplus@gmail.com')
  // deleteDocument('todo','naseer4uplus@gmail.com')

  // checkAndCreateEmptyDocument('todo','naseer4uplus@gmail.com')

const [isAuth,setIsAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = async()=>{
    await logOut();
    setIsAuth(null)
  }

  const handleAuth = async(email,pwd)=>{
    let result = await handleLoginWithUserAndPassword(email,pwd)
    console.log('is auth>>>',result)
    setIsAuth(result.email)
    // setIsAuth(checkUserStatus())

  }

  useEffect(()=>{

    async function checkIsAuthenticated(){
      try{
        let result = await checkUserStatus();
        if(result?.user){

          setIsAuth(result.user)
        }
        setLoading(false)

      }catch(e){
        // alert(JSON.stringify(e))
        setLoading(false)

      }
    }
    checkIsAuthenticated()

  },[isAuth])

  if (loading) {
    return <Loader open={loading}/>; // Show loading state while checking auth
  }

 
  return (
    <Provider store={store}>
      {/* <Home /> */}
     {isAuth ? <Home logout={handleLogout} /> : <Login handleAuth={handleAuth} />}
    </Provider>
  )
}

export default App
