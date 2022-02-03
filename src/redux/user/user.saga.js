import UserActionTypes from "./user.types";
import { all, call, put, takeLatest } from 'redux-saga/effects'

import { googleProvider, auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import { 
    signInSuccess, 
    signInFailure, 
    signOutSuccess, 
    signOutFailure,
    signUpSuccess,  
    signUpFailure, 
} from "./user.actions";

function* getSnapShotFromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData)
        const userSnaphot = yield userRef.get()
        yield put(signInSuccess({id: userSnaphot.id, ...userSnaphot.data()}))
    } catch(error) {
        yield put(signInFailure(error.message))
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider)
        yield getSnapShotFromUserAuth(user)
    } catch(error) {
        yield put(signInFailure(error.message))
    }
}

export function* signInWithEmailPassword({payload: {email, password}}) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password)
        yield getSnapShotFromUserAuth(user)
    } catch(error) {
        yield put(signInFailure(error.message))
    }
}

export function* signOut() {
    try {
        yield auth.signOut()
        yield put(signOutSuccess())
    } catch(error) {
        yield put(signOutFailure(error.message))
    }
}

export function* signUpWithEmailAndPassword({payload: {email, password, displayName}}) {
    try {
        const { user }  = yield auth.createUserWithEmailAndPassword(email, password)
        yield put(signUpSuccess({user, additionalData: {displayName}}))
        // const userRef = yield call(createUserProfileDocument, user, {displayName})
        // const userSnaphot = yield userRef.get()
        // yield put(signUpSuccess({id: userSnaphot.id, ...userSnaphot.data()}))
    } catch(error) {
        yield put(signUpFailure(error.message))
    }
}

export function* signInAfterSignUp({payload: {user, additionalData}}) {
    try{
        yield getSnapShotFromUserAuth(user, additionalData)
    } catch(error) {
        yield put(signInFailure(error.message))
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmailPassword)
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUpWithEmailAndPassword)
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart), 
        call(onEmailSignInStart), 
        call(onSignOutStart), 
        call(onSignUpStart), 
        call(onSignUpSuccess)
    ])
}