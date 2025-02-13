import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig/firebaseConfig";
import logger from '../../utils/logger'

const COLLECTION = "todo";
const DOCUMENT = "todolist"; // we will put username here

async function addObjectInArrayInField(key, listItem) {
  try {
    const docRef = doc(db, COLLECTION, DOCUMENT);
    await setDoc(docRef, { [key]: arrayUnion(listItem) }, { merge: true });

    logger.log(`Item added to field '${key}'.`);
  } catch (error) {
    logger.error("Error adding item:", error);
  }
}




async function updateObjectInArrayInField(key, itemId, updatedFields) {
  try {
    // Create a reference to the document you want to update
    const docRef = doc(db, COLLECTION, DOCUMENT);

    // Get the document to check if it exists
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      // Document exists, get the array field
      const docData = docSnapshot.data();
      const arrayField = docData[key] || [];

      // Find the index of the object in the array that has the matching id
      const index = arrayField.findIndex((item) => item.id === itemId);

      if (index !== -1) {
        // If the object with the matching id is found, update it
        arrayField[index] = { ...arrayField[index], ...updatedFields }; // Merge updated fields into the object

        // Update the document with the modified array
        await updateDoc(docRef, {
          [key]: arrayField,
        });

        logger.log("Item updated in the array!");
      } else {
        logger.log("Item with the specified id not found.");
      }
    } else {
      logger.log("Document does not exist.");
    }
  } catch (error) {
    logger.error("Error updating item in array: ", error);
  }
}

async function deleteObjectInArrayInField(key, itemId) {
  try {
    // Create a reference to the document
    const docRef = doc(db, COLLECTION, DOCUMENT);

    // Get the document to check if it exists
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      // Document exists, get the array field
      const docData = docSnapshot.data();
      const arrayField = docData[key] || [];

      // Find the object in the array that has the matching id
      const itemToRemove = arrayField.find((item) => item.id === itemId);

      if (itemToRemove) {
        // If the item exists, remove it from the array using arrayRemove
        await updateDoc(docRef, {
          [key]: arrayRemove(itemToRemove), // This will remove the item from the array
        });

        logger.log("Item removed from the array!");
      } else {
        logger.log("Item with the specified id not found.");
      }
    } else {
      logger.log("Document does not exist.");
    }
  } catch (error) {
    logger.error("Error removing item from array: ", error);
  }
}

async function getObjectInArrayInFieldByCondition(
  fieldName,
  conditionField,
  conditionOperator,
  conditionValue
) {
  try {
    // Create a reference to the document
    const docRef = doc(db, COLLECTION, DOCUMENT); // Replace COLLECTION and DOCUMENT with actual values

    // Get the document snapshot
    const docSnapshot = await getDoc(docRef);

    // Check if the document exists
    if (docSnapshot.exists()) {
      const docData = docSnapshot.data();

      // Check if the array field exists in the document
      if (docData && docData.hasOwnProperty(fieldName)) {
        const arrayData = docData[fieldName]; // The array field (e.g., "todos")

        // Check if the array field is an array and iterate over it
        if (Array.isArray(arrayData)) {
          // Apply dynamic condition filter
          const matchedItems = arrayData.filter((item) => {
            switch (conditionOperator) {
              case "==":
                return item[conditionField] === conditionValue;
              case "!=":
                return item[conditionField] !== conditionValue;
              case ">":
                return item[conditionField] > conditionValue;
              case "<":
                return item[conditionField] < conditionValue;
              case ">=":
                return item[conditionField] >= conditionValue;
              case "<=":
                return item[conditionField] <= conditionValue;
              case "contains": // For string matching or array containing condition
                return (
                  item[conditionField] &&
                  item[conditionField].includes(conditionValue)
                );
              default:
                logger.log(
                  "Unsupported condition operator:",
                  conditionOperator
                );
                return false;
            }
          });

          // If matched items exist, return them
          if (matchedItems.length > 0) {
            logger.log(
              `Found items in ${fieldName} with ${conditionField} ${conditionOperator} ${conditionValue}:`,
              matchedItems
            );
            return matchedItems;
          } else {
            logger.log(
              `No items in ${fieldName} match the condition ${conditionField} ${conditionOperator} ${conditionValue}.`
            );
            return null;
          }
        } else {
          logger.log(`${fieldName} is not an array.`);
          return null;
        }
      } else {
        logger.log(`Field '${fieldName}' not found in document.`);
        return null;
      }
    } else {
      logger.log("No such document!");
      return null;
    }
  } catch (error) {
    logger.error("Error getting document: ", error);
    return null;
  }
}

export {
  addObjectInArrayInField,
  updateObjectInArrayInField,
  deleteObjectInArrayInField,
  getObjectInArrayInFieldByCondition,
};
