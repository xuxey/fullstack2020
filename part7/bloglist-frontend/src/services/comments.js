import axios from 'axios'

const baseUrl = '/api/comments/'
let token = null

const setToken = newToken => token = `bearer ${newToken}`

const getCommentsByBlogId = async (blogId) => {
    const comments = await axios.get(baseUrl + blogId)
    return comments.data
}

const addNewComment = (blogId, content, token = token) => {
    const config = {headers: {authorization: token, 'Content-Type': 'application/json'}}
    const request = axios.post(baseUrl + blogId, {content}, config)
    return request.then(response => response.data)
}

const deleteComment = (commentId, token = token) => {
    const config = {headers: {authorization: token, 'Content-Type': 'application/json'}}
    const request = axios.delete(baseUrl + commentId, config)
    return request.then(response => response.data)
}
export default {deleteComment, getCommentsByBlogId, addNewComment, setToken}
