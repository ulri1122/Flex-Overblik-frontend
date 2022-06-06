import Axios from 'axios'

const axiosToken = Axios.create({})
axiosToken.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  config.headers.Authorization = 'Bearer ' + token

  return config
})
export default axiosToken
