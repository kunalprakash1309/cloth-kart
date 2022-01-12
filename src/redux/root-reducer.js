import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './user/user.reducer'
import cartReducer from './cart/cart.reducer'

/*
    Reducer is pure function takes cuurentState(Initial state) and action as their paramater.
    Reducer fucntion return a new object i.e state

*/
const persistConfig = {
    key: 'primary',
    storage,
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
})

export default persistReducer(persistConfig, rootReducer)