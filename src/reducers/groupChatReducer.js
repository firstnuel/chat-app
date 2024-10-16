import { createSlice } from '@reduxjs/toolkit'
import messageService from '../services/message'
import { setLastMsgTime } from './chatReducer'

const date = new Date()
const groupChatSlice = createSlice({
  name: 'groupChats',
  initialState: [],
  reducers: {
    setGroupChat(state, action) {
      return action.payload
    },
    newGroupChat(state, action) {
      state.push(action.payload)
    },
    clearGroupChat(state) {
      return []
    }
  }
})



export const { setGroupChat, newGroupChat, clearGroupChat } = groupChatSlice.actions
export default groupChatSlice.reducer

export const initializeGroupChats = (senderId, groupId) => {
  return async dispatch => {
    try {
      const groupchats = await messageService.fetchGroup(senderId, groupId)
      dispatch(setGroupChat(groupchats))
    } catch(e) {
      console.error
    }
  }
}

export const sendGroupChat = (chatData) => {
  return async dispatch => {
    try{
      const chat = await messageService.sendGroup(chatData)
      const lastTime = chat.createdAt || date
      setLastMsgTime(lastTime)
      dispatch(newGroupChat(chat))
    } catch (e){
      console.error(e)
    }
  }
}

