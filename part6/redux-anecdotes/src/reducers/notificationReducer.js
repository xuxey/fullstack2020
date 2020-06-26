const initialState = {message: '', timeoutId: ''}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NOTIFY': {
            clearTimeout(state.timeoutId)
            return {message: action.notification.message, timeoutId: state.timeoutId}
        }
        case 'TIMEOUT':
            return {message: state.message, timeoutId: action.notification.timeoutId}
        default:
            return state
    }
}

export const notify = (message, time) => {
    return async dispatch => {
        const timeoutId = setTimeout(() => dispatch({type: 'NOTIFY', notification: {message: ''}}), time * 1000)
        dispatch({
            type: 'NOTIFY',
            notification: {message}
        })
        dispatch({
            type: 'TIMEOUT',
            notification: {timeoutId}
        })
    }
}
export default notificationReducer
