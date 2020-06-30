import React from 'react'
import '../App.css'
import {useSelector} from 'react-redux'

const Notification = () => {
    const notification = useSelector(state => state.notification)
    return (<>{
        notification.message !== '' &&
        <div className={notification.error ? 'error' : 'message'}>
            {notification.message}
        </div>
    }</>)
}

export default Notification
