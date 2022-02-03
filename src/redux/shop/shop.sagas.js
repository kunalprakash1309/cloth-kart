import { all, call, put, takeLatest } from 'redux-saga/effects'
import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils'
import { fetchCollectionsFailure, fetchCollectionsSuccess } from './shop.actions'

import ShopActionTypes from './shop.types'

// all this generator function runs concurrently

export function* fetchCollectionAsync() {
    try {
        const collectionRef = firestore.collection('collections')
        const snapShot = yield collectionRef.get()
        // we can also do this way. But if it takes longer time than what we expected. ie why we use call() 
        // const collectionMap = convertCollectionsSnapshotToMap(snapShot)

        // using yield provide control upto this code.
        // call() :- call is effect inside our generator function that invokes the method or any function
        const collectionMap = yield call(convertCollectionsSnapshotToMap, snapShot)

        // put() :- Put is resemble to dispatch effect
        // it is the effect for creating actions
        yield put(fetchCollectionsSuccess(collectionMap))
    } catch(error) {
        yield put(fetchCollectionsFailure(error.message))
    }

    // const collectionRef = firestore.collection('collections')
    //     dispatch(fetchCollectionsStart())

    //     // this code comes from shop.component.js.
    //     collectionRef.get().then(snapShot => {
    //         const collectionsMap = convertCollectionsSnapshotToMap(snapShot)
    //         dispatch(fetchCollectionsSuccess(collectionsMap))
    //     }).catch(error => dispatch(fetchCollectionsFailure(error.message)))
}

export function* fetchCollectionStart() {
    // takeEvery listens for specific action type what we provided here
    // if this actions fires multiple times then the last action call or the most updated call will take place
    // because it is not good to fire fetchCollectionAsync method mutiple times
    yield takeLatest(ShopActionTypes.FETCH_COLLECTION_START, fetchCollectionAsync)
}

export function* shopSagas() {
    yield all([call(fetchCollectionStart)])
}