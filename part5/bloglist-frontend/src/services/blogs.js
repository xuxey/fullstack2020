import axios from 'axios'

const baseUrl = '/api/blogs/'
let token = null

const setToken = newToken => token = `bearer ${newToken}`
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addNewBlog = (blog) => {
  const config = {headers: {authorization: token, 'Content-Type': 'application/json'}}
  const request = axios.post(baseUrl, blog, config)
  return request.then(response => response.data)
}

const addLike = (blog) => {
  blog.likes = blog.likes + 1
  const config = {headers: {authorization: token, 'Content-Type': 'application/json'}}
  const request = axios.put(baseUrl + blog.id, blog, config)
  return request.then(response => response.data)
}

const deleteBlog = (blog) => {
  const config = {headers: {authorization: token, 'Content-Type': 'application/json'}}
  const request = axios.delete(baseUrl + blog.id, config)
  return request.then(response => response.data)
}
export default {getAll, setToken, addNewBlog, addLike, deleteBlog}
