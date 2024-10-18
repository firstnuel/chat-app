import axios from 'axios'

const loginUrl = `${import.meta.env.VITE_API_URL}/api/login`
const signupUrl = `${import.meta.env.VITE_API_URL}/api/signup`
const userUrl = `${import.meta.env.VITE_API_URL}/api/users`
const groupUrl = `${import.meta.env.VITE_API_URL}/api/groups`

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
        const response = await axios.post(signupUrl, newUser)
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

const groups = async () => {
  const config =  {
    headers: { Authorization: token },
  }
  const response = await axios.get(groupUrl, config)
  return response.data
}

const userChats = async ( userId ) => {
  const config = {
    headers: { Authorization: token },
    params: { userId }
  }

  const response = await axios.get(`${userUrl}/chats`, config)
  return response.data
}

const createGroup = async (groupData) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(groupUrl, groupData, config)
  return response.data
}

const updateUser = async (userData, userId) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${userUrl}/${userId}`, userData, config)
  return response.data
}

const deleteGroup = async (groupId) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`/${groupUrl}/${groupId}`, config)
  return response.status
}


export default { setToken, login, users, create, userChats, groups, createGroup, deleteGroup, updateUser }