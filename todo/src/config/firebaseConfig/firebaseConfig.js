// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import { getAuth} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: ' AIzaSyDmWVZ2d0IT9X_P9TXHMZvZWzkUSlNiBFg ',
  authDomain: 'naseer-dev.firebaseapp.com',
  projectId: 'naseer-dev',
  storageBucket: 'naseer-dev.appspot.com',
  messagingSenderId: '132847224875 ',
  appId: '1:132847224875:android:8045f454e556672015826e',
  // measurementId: 'G-3V9J6V5HZG',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth,db, storage, app};