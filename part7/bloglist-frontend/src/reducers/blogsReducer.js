import blogService from '../services/blogs'
import {notify} from "./notificationReducer";

const initialState = []

const blogsReducer = (state = initialState, action) => {
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
        console.log('LIKED BLOG', likedBlog)
        dispatch({
            type: 'LIKE_BLOG',
            blog: likedBlog
        })
    }
}

export const addBlog = (blog, token) => {
    return dispatch => {
        blogService.addNewBlog(blog, token)
            .then((blog) => {
                dispatch({
                    type: 'ADD_BLOG',
                    blog
                })
                dispatch(notify('New Blog Created', false))
            })
            .catch(() => dispatch(notify('Could not add blog', true)))
    }
}

export const deleteBlog = (blog, token) => {
    return dispatch => {
        blogService.deleteBlog(blog, token)
            .then(() => {
                console.log('DELETE_EXECUTED')
                dispatch({
                    type: 'DELETE_BLOG',
                    blog
                })
                dispatch(notify('Blog deleted', false))
            })
            .catch(() => dispatch(notify('Could not delete blog', true)))
    }
}
export default blogsReducer
