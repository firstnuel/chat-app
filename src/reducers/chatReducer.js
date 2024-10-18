import { createSlice } from '@reduxjs/toolkit'
import messageService from '../services/message'

const date = new Date()
const chatSlice = createSlice({
  name: 'chats',
  initialState: [],
  reducers: {
    setChat(state, action) {
      return action.payload
    },
    newChat(state, action) {
      const exists = state.some(chat => chat.id === action.payload.id)
      if (!exists) {
        state.push(action.payload)
      }
    },
    receiveChat(state, action) {
      const exists = state.some(chat => chat.id === action.payload.id)
      if (!exists) {
        state.push(action.payload) // Handle incoming chat from socket
      }
    },
    clearChat(state) {
      return []
    }
  }
})

export let LastMsgTime = null
export const setLastMsgTime = (time) => LastMsgTime = time

export const { setChat, newChat, receiveChat, clearChat } = chatSlice.actions
export default chatSlice.reducer

export const initializeChats = (senderId, receiverId) => {
  return async dispatch => {
    try {
      const chats = await messageService.fetch(senderId, receiverId)
      dispatch(setChat(chats))
    } catch(e) {
      console.error
    }
  }
}

export const sendChat = (chatData) => {
  return async dispatch => {
    try {
      const chat = await messageService.send(chatData)
      const lastTime = chat.createdAt || date
      setLastMsgTime(lastTime)
      dispatch(newChat(chat))
    } catch (e) {
      console.error(e)
    }
  }
}

// New function to handle incoming chat messages from Socket.IO
export const receiveChatMessage = (chatData) => {
  return dispatch => {
    dispatch(receiveChat(chatData)) // Dispatch the new chat message
  }
}
