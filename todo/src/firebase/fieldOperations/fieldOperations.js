import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  deleteField,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore"
import { db } from "../../config/firebaseConfig/firebaseConfig"

const COLLECTION = "todo"
const DOCUMENT = "todolist" // we will put username here

async function removeFieldWithData(key) {
  try {
    // Create a reference to the document
    const todoListRef = doc(db, COLLECTION, DOCUMENT)

    // Remove the field from the document
    await updateDoc(todoListRef, {
      [key]: deleteField(), // This will delete the field specified by 'key'
    })

    console.log(`Field '${key}' successfully removed from the document.`)
  } catch (error) {
    console.error("Error removing field from document: ", error)
  }
}

// Modify your function to add an item to an array field
async function addFieldInDB(key, item) {
  try {
    // Create a reference to the document
    const todoListRef = doc(db, COLLECTION, DOCUMENT) // Replace COLLECTION and DOCUMENT with actual values

    // Use arrayUnion to add the item to the array field
    await updateDoc(todoListRef, {
      [key]: arrayUnion(item), // This will add 'item' to the array field specified by 'key'
    })

    console.log("Document successfully updated!")
  } catch (error) {
    console.error("Error updating document: ", error)
  }
}

async function updateAllDataInField(key, list) {
  try {
    // Create a reference to the document
    const todoListRef = doc(db, COLLECTION, DOCUMENT)

    // Update the specific field in the document with the new data
    await updateDoc(todoListRef, {
      [key]: list, // This will only update the field specified by 'key' with the new list
    })

    console.log("Document successfully updated!")
  } catch (error) {
    console.error("Error updating document: ", error)
  }
}

async function getAllFieldsWithData() {
  try {
    // Create a reference to the document
    const todoListRef = doc(db, COLLECTION, DOCUMENT)

    // Get the document snapshot
    const docSnapshot = await getDoc(todoListRef)

    // Check if the document exists
    if (docSnapshot.exists()) {
      console.log("Document data:", docSnapshot.data())
      return docSnapshot.data() // Return the document data
    } else {
      console.log("No such document!")
      return null
    }
  } catch (error) {
    console.error("Error getting document: ", error)
    return null
  }
}

async function getAllDataFromField(fieldName) {
  try {
    // Create a reference to the document
    const todoListRef = doc(db, COLLECTION, DOCUMENT)

    // Get the document snapshot
    const docSnapshot = await getDoc(todoListRef)

    // Check if the document exists
    if (docSnapshot.exists()) {
      const docData = docSnapshot.data()
      // Check if the specific field exists in the document data
      if (docData && docData.hasOwnProperty(fieldName)) {
        console.log(`${fieldName} data:`, docData[fieldName])
        return docData[fieldName] // Return only the specified field
      } else {
        console.log(`Field '${fieldName}' does not exist in the document.`)
        return null // Return null if the field does not exist
      }
    } else {
      console.log("No such document!")
      return null
    }
  } catch (error) {
    console.error("Error getting document: ", error)
    return null
  }
}

async function getDataFromFieldById(fieldName, id) {
  try {
    // Create a reference to the document
    const todoListRef = doc(db, COLLECTION, DOCUMENT)

    // Get the document snapshot
    const docSnapshot = await getDoc(todoListRef)

    // Check if the document exists
    if (docSnapshot.exists()) {
      const docData = docSnapshot.data()

      // Check if the field exists and is an array
      if (
        docData &&
        docData.hasOwnProperty(fieldName) &&
        Array.isArray(docData[fieldName])
      ) {
        const fieldData = docData[fieldName]

        // Find the object in the array based on the ID
        const result = fieldData.find((item) => item.id === id) // Assuming 'cid' is the ID field

        if (result) {
          console.log(`${fieldName} object with ID ${id}:`, result)
          return result // Return the matching object
        } else {
          console.log(`No object found with ID ${id} in field '${fieldName}'.`)
          return null
        }
      } else {
        console.log(`Field '${fieldName}' does not exist or is not an array.`)
        return null
      }
    } else {
      console.log("No such document!")
      return null
    }
  } catch (error) {
    console.error("Error getting document: ", error)
    return null
  }
}

export {
  getAllDataFromField,
  getDataFromFieldById,
  getAllFieldsWithData,
  addFieldInDB,
  updateAllDataInField,
  removeFieldWithData,
}
