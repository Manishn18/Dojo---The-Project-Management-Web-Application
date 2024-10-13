// Connect your frontend project with firebase

import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBmSOqkExVTlmuvwUGXy5x5qZf4FqAWU1g",
    authDomain: "thedojosite-3ed20.firebaseapp.com",
    projectId: "thedojosite-3ed20",
    storageBucket: "thedojosite-3ed20.appspot.com",
    messagingSenderId: "315143176566",
    appId: "1:315143176566:web:689822d335a218432b3a57"
};

// Initialize Firebase application with the provided configuration
// The `firebase.initializeApp(firebaseConfig)` function sets up the Firebase app using the specified settings in the `firebaseConfig` object.
// This is essential for connecting the app to Firebase services (e.g., Firestore, Authentication, etc.)
firebase.initializeApp(firebaseConfig);

// Initialize Firestore service from Firebase SDK
// This creates an instance of Firestore that allows interaction with the Firestore database.
// The `firebase.firestore()` method is used to access Firestore-related functionalities like reading, writing, and querying documents.
const projectFirestore = firebase.firestore();


// Initialize Firebase Authentication service
// The `firebase.auth()` method returns an instance of the Firebase Authentication service,
// which allows handling user authentication (sign-up, login, logout, etc.)
// This instance provides methods like `signInWithEmailAndPassword`, `signOut`, `onAuthStateChanged`, etc.
const projectAuth = firebase.auth();

// Initialize Firebase Storage service
// The `firebase.storage()` method returns an instance of the Firebase Storage service, which allows handling file uploads, downloads, and storage management in Firebase.
// This instance provides methods like `ref()` to create a reference to a file location,
// `put()` to upload a file, `getDownloadURL()` to retrieve the file URL, and more.
const projectStorage = firebase.storage();

// Access Firebase Firestore's Timestamp class
// The `firebase.firestore.Timestamp` provides methods to handle timestamps in Firestore.
// It is used to create or retrieve timestamp values (e.g., when storing the exact date and time in Firestore).
// You can use `Timestamp.now()` to get the current time, or create a custom timestamp.
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
