const initialState = ''

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NOTIFY':
            return action.message
        default:
            return state
    }
}

export const notify = (message, dispatch) => {
    setTimeout(() => dispatch({type: 'NOTIFY', message: ''}), 5000)
    return {
        type: 'NOTIFY',
        message
    }
}
export default notificationReducer
