import {applyMiddleware, combineReducers, createStore} from 'redux'
import filterReducer from './reducers/filterReducer'
import thunk from 'redux-thunk'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import {composeWithDevTools} from 'redux-devtools-extension'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
})

export default createStore(reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    ))
