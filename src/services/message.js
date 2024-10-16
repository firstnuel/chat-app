import axios from 'axios'
import { token } from './user'

const BaseUrl = '/api/chat'

const fetch = async (senderId, receiverId) => {
  const config = {
    headers: { Authorization: token },
    params: {
      senderId,
      receiverId
    }
  }
  const response = await axios.get(BaseUrl, config)
  return response.data
}

const fetchGroup = async (senderId, groupId) => {
  const config = {
    headers: { Authorization: token },
    params: {
      senderId,
      groupId
    }
  }
  const response = await axios.get(`${BaseUrl}/groups`, config)
  return response.data
}

const send = async (msgData) => {
  const config = {
    headers:  { Authorization: token },
  }
  const response = await axios.post(BaseUrl, msgData, config)
  return response.data
}

const sendGroup = async (msgData) => {
  const config = {
    headers:  { Authorization: token },
  }
  const response = await axios.post(`${BaseUrl}/groups`, msgData, config)
  return response.data
}

export default { fetch, send, sendGroup, fetchGroup }