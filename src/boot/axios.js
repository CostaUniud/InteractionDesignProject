import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

// axios.defaults.baseURL = process.env.BASE_URL
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data/application/json'

// Add a request interceptor
axios.interceptors.request.use(request => {
  return request
}, function (error) {
  console.log('axios.interceptors.request > error response:', error)
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(response => {
  return response
}, function (error) {
  console.log('axios.interceptors.response > error response:', error)
  return Promise.reject(error)
})
