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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get();


    if (!snapShot.exists) {
        const {displayName, email} = userAuth
        const createdAt = new Date()

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error) {
            console.log("Error creating user ", error.message)
        }
    }

    return userRef

}

// export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
//     const collectionRef = firestore.collection(collectionKey)
//     const snapShot = collectionRef.get()
//     console.log(collectionRef.get())

//     // If we do not use snapShot.empty it adds duplicate data in our firestore
//     // i.e why we are running this app only once in our complete course.
//     // if we want to add different collection in our collections we use given below method
//     console.log((snapShot).empty)
    
//     // Batch is used for multiple write. If single of them return error then complete process move backward to zero
//     // It helps to do all necessary multiple write at one time 
//    const batch = firestore.batch()
//     objectsToAdd.forEach(obj => {
//         const newDocRef = collectionRef.doc()
//         batch.set(newDocRef, obj)
//     })

//     return await batch.commit()
// }

// We are passing docs snapshot which contains all single doc refernce 
export const convertCollectionsSnapshotToMap = (collections) => {

    // we are using docs property which result in array of documents and mapping through each doc snapshot 
    const transformedCollection = collections.docs.map(doc => {

        // calling .data() gives all data inside single doc of collections collection
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()), //encodeURI uses to convert string to URI readable string
            id: doc.id,
            title,
            items
        }
    })
    //console.log(transformedCollection) use this to know the use of below function
    // actually we are return object in place of an array
    return transformedCollection.reduce((acc, collection) => {
        acc[collection.title.toLowerCase()] = collection;
        return acc;
    }, {})
}

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