import {auth} from '../../config/firebaseConfig/firebaseConfig'
import {signInWithEmailAndPassword,onAuthStateChanged,signOut } from "firebase/auth"


const checkUserStatus = () => {
  return new Promise((resolve, reject) => {

    /**
     * onAuthStateChanged(auth, callback) listens for changes in the user's authentication state (e.g., when a user logs in, logs out, or the session expires).
     * 
     * This listener does not automatically stop after firing once; it continues listening for changes in the user's authentication state.
     * 
     * If you don’t call unsubscribe(), the listener will remain active and could potentially cause unnecessary checks and consume resources (this is why we need to unsubscribe to avoid memory leaks).
     * 
     * If you call unsubscribe() inside the callback, the listener stops listening as soon as it has finished checking the authentication state.
     * 
     * If you were to call unsubscribe() outside the callback, it would immediately remove the listener before the authentication state is checked. The listener would be gone before any changes in the user’s authentication state could even trigger the callback, meaning you would never get the result you're expecting.
     * 
     */
    // Start observing the authentication state
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // If user is signed in, get the token
          const idToken = await currentUser.getIdToken();
          console.log("User is already logged in:", currentUser.email);
          console.log("ID Token (Access Token):", idToken);
          resolve({ user: currentUser, idToken });  // Resolve with user and token
        } catch (error) {
          //Error fetching ID token: 
          reject({error:error.message});
        }
      } else {
        // If no user is signed in, reject with an error message
        reject({error:"No user is signed in."});
      }

      // Unsubscribe from the listener to avoid memory leaks
      unsubscribe();
    });
  });
}

const handleLoginWithUserAndPassword = async (email,password) => {
  try {
    // Step 2: If no user is signed in, proceed with login
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    const newUser = userCredential.user
    const token = await newUser.getIdToken() // Get the Firebase ID token
    return newUser
  } catch (error) {
    return error
  }
}


const logOut = async() =>{
  try {
    await signOut(auth);
    console.log("User successfully signed out.");
  } catch (error) {
    console.error("Logout failed:", error.message);
    alert("An error occurred while logging out. Please try again.");
  }

}



export { handleLoginWithUserAndPassword,checkUserStatus,logOut }
