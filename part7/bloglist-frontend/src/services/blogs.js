import axios from 'axios'

const baseUrl = '/api/blogs/'
let token = null

const setToken = newToken => token = `bearer ${newToken}`
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addNewBlog = async (blog, token) => {
  const config = {headers: {authorization: token, 'Content-Type': 'application/json'}}
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const addLike = async (blog) => {
  blog.likes = blog.likes + 1
  const config = {headers: {authorization: token, 'Content-Type': 'application/json'}}
  const response = await axios.put(baseUrl + blog.id, blog, config)
  return response.data
}

const deleteBlog = async (blog, token) => {
  const config = {headers: {authorization: token, 'Content-Type': 'application/json'}}
  const response = await axios.delete(baseUrl + blog.id, config)
  return response.data
}

export default {getAll, setToken, addNewBlog, addLike, deleteBlog}
