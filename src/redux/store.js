import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import rootReducer from './root-reducer'

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
}

// createStore gets a root reducer and return value of applyMiddleware
export const store = createStore(rootReducer,applyMiddleware(...middlewares))

export const persistor = persistStore(store)

/*
    Thunk :- Thunk is basically a middleware which looks after actions which returns function inspite of object. Because as we 
             know that actions return object which contains type and payload.
             Whenever it catches that type of action it provides "dispatch" to function to use it and call it using multiple action
*/


