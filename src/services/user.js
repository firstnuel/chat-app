import axios from 'axios'

const loginUrl = '/api/login'
const userUrl = '/api/users'

export let token = null

const setToken = (aToken) => token = `Bearer ${aToken}`

const login = async (loginData) => {
  const response = await axios.post(loginUrl, loginData)
  return response.data
}

const create = async (newUser) => {
  const response = await axios.post(userUrl, newUser)
  return response.data
}

const users = async () => {
  const config =  {
    headers: { Authorization: token },
  }
  const response = await axios.get(userUrl, config)
  return response.data
}

export default { setToken, login, users, create }