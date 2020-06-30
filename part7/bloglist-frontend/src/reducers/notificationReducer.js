const initialState = {message: '', timeoutId: '', error: false}

const notificationReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case 'NOTIFY': {
            clearTimeout(state.timeoutId)
            return {message: action.notification.message, error: action.notification.error, timeoutId: state.timeoutId}
        }
        case 'TIMEOUT':
            return {message: state.message, error: state.error, timeoutId: action.timeoutId}
        default:
            return state
    }
}

export const notify = (message, isError, time = 5) => {
    return async dispatch => {
        const timeoutId = setTimeout(() => dispatch({
            type: 'NOTIFY',
            notification: {message: '', error: false}
        }), time * 1000)
        dispatch({
            type: 'NOTIFY',
            notification: {message, error: isError}
        })
        dispatch({
            type: 'TIMEOUT',
            timeoutId
        })
    }
}

export default notificationReducer
