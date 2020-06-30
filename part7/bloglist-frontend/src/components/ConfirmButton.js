import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Button} from "react-bootstrap"

const ConfirmButton = ({label, handleClick}) => {
    const [confirmed, setConfirmed] = useState(false)
    if (confirmed)
        return (
            <Button variant="primary" onClick={handleClick}>Confirm</Button>
        )
    else
        return (
            <Button variant="primary" onClick={() => {
                setConfirmed(true)
            }}>{label}</Button>
        )
}
ConfirmButton.propTypes = {
    label: PropTypes.string.isRequired
}
export default ConfirmButton
