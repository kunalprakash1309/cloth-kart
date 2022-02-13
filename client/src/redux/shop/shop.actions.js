import ShopActionTypes from "./shop.types";
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => ({
    type:ShopActionTypes.FETCH_COLLECTION_START
})

export const fetchCollectionsSuccess = (collectionsMap) => ({
    type: ShopActionTypes.FETCH_COLLECTION_SUCCESS,
    payload: collectionsMap
})

export const fetchCollectionsFailure = (errorMessage) => ({
    type: ShopActionTypes.FETCH_COLLECTION_FAILURE,
    payload: errorMessage
})

// this function helps to use this logic anywhere we need this. Because earlier it was present only in shop.component.js
// This is different type of actions which catches by thunk and it provides "dispatch" to use
// This type of action return function inspite of returning object as shown in above actions.
export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        // it only gets the refrence of collections collection
        const collectionRef = firestore.collection('collections')
        dispatch(fetchCollectionsStart())

        // this code comes from shop.component.js.
        collectionRef.get().then(snapShot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapShot)
            dispatch(fetchCollectionsSuccess(collectionsMap))
        }).catch(error => dispatch(fetchCollectionsFailure(error.message)))
    }
}
