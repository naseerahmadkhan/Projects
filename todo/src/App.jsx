import React, { useState, useEffect, Suspense } from "react"
import Home from "./pages/Home"
import store from "./redux/store"
import { Provider } from "react-redux"
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

import Login from "./pages/login"
import Loader from "./components/Loader/Loader"
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

  const [isAuth, setIsAuth] = useState(null)
  const [loading, setLoading] = useState(true)

  const handleLogout = async () => {
    setLoading(true)
    await logOut()
    setIsAuth(null)
    setLoading(false)
  }

  const handleAuth = async (email, pwd) => {
    setLoading(true)
    let result = await handleLoginWithUserAndPassword(email, pwd)
    setIsAuth(result?.email || null)
    setLoading(false)
  }

  useEffect(() => {
    async function checkIsAuthenticated() {
      setLoading(true) // Ensure loading starts immediately
      try {
        const result = await checkUserStatus()
        if (result?.user) {
          setIsAuth(result.user)
        }
      } catch (e) {
        console.error("Auth check failed:", e)
      }
      setLoading(false) // Ensure loading ends
    }
    checkIsAuthenticated()
  }, [])

  if (loading) {
    return <Loader open={loading} /> // Show loading state while checking auth
  }

  return (
    <Provider store={store}>
      {/* <Home /> */}
      {isAuth ? (
        <Suspense fallback={<Loader open={loading} />}>
          <Home logout={handleLogout} />
        </Suspense>
      ) : (
        <Login handleAuth={handleAuth} />
      )}
    </Provider>
  )
}

export default App
