import blogService from '../services/blogs'

const initialState = []

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_BLOG':
            return [...state, action.blog]
        case 'DELETE_BLOG':
            return state.filter(blog => blog.id !== action.blog.id)
        case 'LIKE_BLOG':
            return state.map(blog => (blog.id === action.blog.id) ? action.blog : blog)
        case 'INIT_BLOGS':
            return action.blogs
        default:
            return state
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            blogs
        })
    }
}
export const likeBlog = (blog) => {
    return async dispatch => {
        const likedBlog = await blogService.addLike(blog)
        dispatch({
            type: 'LIKE_BLOG',
            blog: likedBlog
        })
    }
}

export const addBlog = (blog, token) => {
    return async dispatch => {
        const savedBlog = await blogService.addNewBlog(blog, token)
        dispatch({
            type: 'ADD_BLOG',
            blog: savedBlog
        })
    }
}

export const deleteBlog = (blog, token) => {
    return async dispatch => {
        await blogService.deleteBlog(blog, token)
        dispatch({
            type: 'DELETE_BLOG',
            blog
        })
    }
}
export default notificationReducer
