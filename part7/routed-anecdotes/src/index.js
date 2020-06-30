import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {BrowserRouter as Router,} from "react-router-dom"

const RoutedApp = () => {
    return (
        <div className="container">
            <Router>
                <App/>
            </Router>
        </div>

    )
}
ReactDOM.render(<RoutedApp/>, document.getElementById('root'))
