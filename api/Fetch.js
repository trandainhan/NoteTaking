import axios from 'axios'

const BASE_URL = "http://localhost:3000"

export default {
  get: (path, data) => {
    return axios.get(BASE_URL + path, data)
  },
  post: (path, data) => {
    return axios.post(BASE_URL + path, data)
  }
}
