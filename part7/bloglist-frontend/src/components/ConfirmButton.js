import React, {useState} from 'react'
import PropTypes from 'prop-types'

const ConfirmButton = ({label, handleClick}) => {
    const [confirmed, setConfirmed] = useState(false)
    if (confirmed)
        return (
            <button onClick={handleClick}>Confirm</button>
        )
    else
        return (
            <button onClick={() => {
                setConfirmed(true)
            }}>{label}</button>
        )
}
ConfirmButton.propTypes = {
    label: PropTypes.string.isRequired
}
export default ConfirmButton
