import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCe3ka_RVzh5gaDTvzbXMoxjmvHYVeoYG4",
    authDomain: "flashcard-saas-app-6ffb8.firebaseapp.com",
    projectId: "flashcard-saas-app-6ffb8",
    storageBucket: "flashcard-saas-app-6ffb8.appspot.com",
    messagingSenderId: "385590181655",
    appId: "1:385590181655:web:d1e4b43ad945c743a30152",
    measurementId: "G-LM2KVZC0GV"
  };
  

  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };