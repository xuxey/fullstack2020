const initialState = ''

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NOTIFY':
            return action.message
        default:
            return state
    }
}

export const notify = (message, time) => {
    return async dispatch => {
        setTimeout(() => dispatch({type: 'NOTIFY', message: ''}), time * 1000)
        dispatch({
            type: 'NOTIFY',
            message
        })
    }
}
export default notificationReducer
