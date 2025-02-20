import React, { useState, useEffect } from "react";
import Home from "./pages/Home"
import store from "./redux/store"
import { Provider } from "react-redux"
import {checkUserStatus} from './firebase/userAuthOperations/userAuthOperations'
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
  
  // checkUserStatus()
  // getAllDocumentsFromCollection('todo')
  // getDocumentFields('todolist','todo')
  // addEmptyDocumentWithCustomId('todo','naseer4uplus@gmail.com')
  // deleteDocument('todo','naseer4uplus@gmail.com')

  // checkAndCreateEmptyDocument('todo','naseer4uplus@gmail.com')

 
 
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  )
}

export default App
