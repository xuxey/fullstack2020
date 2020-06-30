import userService from "../services/users";

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_USERS':
            return action.users
        default:
            return state
    }
}

export const initUserList = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch({
            type: 'INIT_USERS',
            users
        })
    }
}

export default reducer
