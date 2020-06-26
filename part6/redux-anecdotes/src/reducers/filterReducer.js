const initialState = ''

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTER':
            return action.content
        default:
            return state
    }
}

export const updateFilter = (content) => {
    return {
        type: 'FILTER',
        content
    }
}
export default reducer
