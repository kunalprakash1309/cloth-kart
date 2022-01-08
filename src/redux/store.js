import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

import rootReducer from './root-reducer'

const middlewares = [logger]

// createStore gets a root reducer and return value of applyMiddleware
const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store