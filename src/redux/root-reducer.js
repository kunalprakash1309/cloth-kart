import { combineReducers } from 'redux'

import userReducer from './user/user.reducer'

/*
    Reducer is pure function takes cuurentState(Initial state) and action as their paramater.
    Reducer fucntion return a new object i.e state

*/

export default combineReducers({
    user: userReducer
})