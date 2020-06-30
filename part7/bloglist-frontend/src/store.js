import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'
import formReducer from './reducers/formReducer'

const reducer = combineReducers({
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
    form: formReducer
})

export default createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
)
