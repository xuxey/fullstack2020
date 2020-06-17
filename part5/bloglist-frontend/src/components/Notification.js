import React from 'react'
import '../App.css'

const Notification = (props) => {
    if (props.message.text === '') return <></>
    return (
        <div className={props.message.error ? 'error' : 'message'}>
            {props.message.text}
        </div>
    )
}

export default Notification
