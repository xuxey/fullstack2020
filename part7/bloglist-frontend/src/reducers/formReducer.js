const initialState = [
    {
        id: 'blogform-title',
        content: ''
    },
    {
        id: 'blogform-url',
        content: ''
    },
    {
        id: 'blogform-author',
        content: ''
    },
    {
        id: 'login-username',
        content: ''
    },
    {
        id: 'login-password',
        content: ''
    }
]

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE':
            return state.map(input => input.id === action.input.id ? action.input : input)
        case 'RESET':
            return state.map(input => input.id.startsWith(action.prefix) ? {id: input.id, content: ''} : input)
        default:
            return state
    }
}

export const selectInput = (id, state) => state.form.find(input => input.id === id).content

export const updateInput = (id, content) => {
    return {
        type: 'UPDATE',
        input: {id, content}
    }
}

export const reset = (prefix) => {
    return {
        type: 'RESET',
        prefix
    }
}
export default reducer
