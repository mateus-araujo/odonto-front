import axios from 'axios'
require('dotenv').config()

let baseURL = ''

if (process.env.NODE_ENV === 'development')
  baseURL = 'http://localhost:3333'
else
  baseURL = 'https://odonto-back.herokuapp.com'

console.log(process.env.NODE_ENV)

const api = axios.create({
  baseURL
})

export default api
