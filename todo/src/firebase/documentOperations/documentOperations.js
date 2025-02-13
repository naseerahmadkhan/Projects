import {doc, getDoc,setDoc,deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig/firebaseConfig"
// Initialize Firestore

async function getDocumentFields(documentId, collectionName) {
  try {
    // Create a reference to the document in the specified collection
    const docRef = doc(db, collectionName, documentId);

    // Fetch the document
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      // Get all fields of the document
      const documentData = docSnapshot.data();
      console.log("Document fields:", documentData);
      return documentData; // Return the document data (fields)
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
  }
}




async function addEmptyDocumentWithCustomId(collectionName, documentId) {
    try {
      // Reference to the specific document in the collection with the custom ID
      const docRef = doc(db, collectionName, documentId);
  
      // Set the document with no data (empty object)
      await setDoc(docRef, {});
  
      console.log("Empty document successfully added with ID:", documentId);
      return documentId; // Return the custom document ID
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }



async function deleteDocument(collectionName, documentId) {
  try {
    // Reference to the document to be deleted
    const docRef = doc(db, collectionName, documentId);

    // Delete the document
    await deleteDoc(docRef);

    console.log(`Document with ID ${documentId} successfully deleted`);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
}





async function checkAndCreateEmptyDocument(collectionName, documentId) {
    try {
      // Reference to the document
      const docRef = doc(db, collectionName, documentId);
  
      // Check if the document exists
      const docSnapshot = await getDoc(docRef);
  
      if (!docSnapshot.exists()) {
        // If the document doesn't exist, create an empty document
        await setDoc(docRef, {});
        console.log(`Document with ID ${documentId} was created successfully (empty).`);
      } else {
        console.log(`Document with ID ${documentId} already exists.`);
      }
    } catch (error) {
      console.error("Error checking or creating document: ", error);
    }
  }




export{getDocumentFields,addEmptyDocumentWithCustomId,deleteDocument,checkAndCreateEmptyDocument}