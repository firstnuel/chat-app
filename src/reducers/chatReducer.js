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
      state.push(action.payload)
    },
    clearChat(state) {
      return []
    }
  }
})

export let LastMsgTime = null
const setLastMsgTime = (time) => LastMsgTime = time

export const { setChat, newChat, clearChat } = chatSlice.actions
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
    try{
      const chat = await messageService.send(chatData)
      const lastTime = chat.createdAt || date
      setLastMsgTime(lastTime)
      dispatch(newChat(chat))
    } catch (e){
      console.error(e)
    }
  }
}

