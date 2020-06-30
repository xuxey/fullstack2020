import React, {useState} from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = {display: visible ? 'none' : ''}
    const showWhenVisible = {display: visible ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <>
      <span style={hideWhenVisible}>
        <button id={props.buttonId} onClick={toggleVisibility}>{props.buttonLabel}</button>
      </span>
            <span style={showWhenVisible}>
        <button onClick={toggleVisibility}>close</button>
      </span>
            <div style={showWhenVisible} className="togglableChildren">
                {props.children}
            </div>
        </>
    )
})
Togglable.displayName = 'Togglable'
Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Togglable
