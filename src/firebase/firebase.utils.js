import firebase from "firebase/compat/app"

// decrease the size of library and automatically "firestore","auth" attach to "firebase" keyword
import "firebase/compat/firestore"
import "firebase/compat/auth"

const config = {
    apiKey: "AIzaSyBwWevHqmcFjeA0512GBOck3XpiEKMEhww",
    authDomain: "cloth-kart.firebaseapp.com",
    projectId: "cloth-kart",
    storageBucket: "cloth-kart.appspot.com",
    messagingSenderId: "771685927032",
    appId: "1:771685927032:web:5cd0f76790d950f14ec58d",
    measurementId: "G-SN7H93F3ZL"
}

firebase.initializeApp(config);

// Gets the Auth service for the defualt app or given app
export const auth = firebase.auth();
export const firestore = firebase.firestore()

// provides GoogleAuthPRovider() class 
const provider = new firebase.auth.GoogleAuthProvider();
// ... Force account selection even when one account is available(to give option for choosing account from multiple options)
provider.setCustomParameters({prompt: 'select_account'})
// use to give pop up auth for google
export const signInWithGoogle = () => auth.signInWithPopup(provider)


export default firebase;