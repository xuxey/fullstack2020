import React from 'react'
import {useSelector} from 'react-redux'
import {Alert} from 'react-bootstrap'

const Notification = () => {
    const notification = useSelector(state => state.notification)
    return (<>{
        notification.message !== '' &&
        <Alert variant={notification.error ? 'danger' : 'success'}>
            {notification.message}
        </Alert>
    }</>)
}

export default Notification
