import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebaseConfig/firebaseConfig"
// Initialize Firestore

async function getAllDocumentsFromCollection(collectionName) {
  try {
    // Reference to the collection
    const collectionRef = collection(db, collectionName);

    // Get all documents in the collection
    const querySnapshot = await getDocs(collectionRef);

    // Map through the documents and get the data
    const documents = querySnapshot.docs.map(doc => ({
      id: doc.id, // Get the document ID
      ...doc.data() // Get the document data
    }));

    console.log("Documents fetched successfully:", documents);
    return documents;
  } catch (error) {
    console.error("Error fetching documents: ", error);
  }
}


export {getAllDocumentsFromCollection}