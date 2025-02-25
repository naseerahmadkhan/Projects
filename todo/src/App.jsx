import React, { useState, useEffect, Suspense } from "react"
import Home from "./pages/Home"

import {
  checkUserStatus,
  handleLoginWithUserAndPassword,
  logOut,
} from "./firebase/userAuthOperations/userAuthOperations"
import {
  addObjectInArrayInField,
  updateObjectInArrayInField,
  deleteObjectInArrayInField,
  getObjectInArrayInFieldByCondition,
} from "./firebase/fieldOperations/arrayInFieldOperations"

import {
  getAllDataFromField,
  getDataFromFieldById,
  getAllFieldsWithData,
  addFieldInDB,
  updateAllDataInField,
  removeFieldWithData,
} from "./firebase/fieldOperations/fieldOperations"

import { getAllDocumentsFromCollection } from "./firebase/collectionOperations/collectionOperations"
import {
  getDocumentFields,
  addEmptyDocumentWithCustomId,
  deleteDocument,
  checkAndCreateEmptyDocument,
} from "./firebase/documentOperations/documentOperations"
import { useDispatch,useSelector } from 'react-redux'; 
import Login from "./pages/login"
import Loader from "./components/Loader/Loader"
import { setUser,handleLogout } from "./features/user/userSlice"
function App() {
  const dispatch = useDispatch(); // Call useDispatch hook outside of the function
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

  const user = useSelector((state) => state.user) || {}
  let isAuth = user.username;
  let loading = user.loading;


  const handleLogout2 = async () => {
    dispatch(setUser({loading:true}))
    await logOut()
    dispatch(setUser({loading:false,username:null}))
  }

  const handleAuth = async (email, pwd) => {
    dispatch(setUser({loading:true}))
    let result = await handleLoginWithUserAndPassword(email, pwd)
    dispatch(setUser({username:result?.email,loading:false,error:null}))
  }

  useEffect(() => {
   
    console.log('user*****',user)

    async function checkIsAuthenticated() {
      dispatch(setUser({loading:true})) // Ensure loading starts immediately
      try {
        const result = await checkUserStatus()
        if (result?.user) {
          dispatch(setUser({username:result.user.email,loading:false,error:null}))
        }
      } catch (e) {
        console.error("Auth check failed:", e)
        dispatch(setUser({loading:false}))
      }
    }
    checkIsAuthenticated()
  }, [])

  if (loading) {
    return <Loader open={loading} /> // Show loading state while checking auth
  }

  return (
    <div>
      {/* <Home /> */}
      {isAuth ? (
        <Suspense fallback={<Loader open={loading} />}>
          <Home logout={handleLogout} />
        </Suspense>
      ) : (
        <Login handleAuth={handleAuth} />
      )}
    </div>
  )
}

export default App
