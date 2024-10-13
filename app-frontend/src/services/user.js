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
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await axios.post(userUrl, newUser)
        resolve(response.data)
      } catch (error) {
        reject(error)
      }
    }, 3000)
  })
}


const users = async () => {
  const config =  {
    headers: { Authorization: token },
  }
  const response = await axios.get(userUrl, config)
  return response.data
}

export default { setToken, login, users, create }