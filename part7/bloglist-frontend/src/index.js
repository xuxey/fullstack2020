import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from "./store";
import {Provider} from "react-redux"
import {BrowserRouter as Router,} from "react-router-dom"

const RoutedApp = () => {
    return (
        <Provider store={store}>
            <Router>
                <App/>
            </Router>
        </Provider>
    )
}
ReactDOM.render(
    <RoutedApp/>
    , document.getElementById('root'))
