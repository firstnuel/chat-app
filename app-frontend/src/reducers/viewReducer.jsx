import { createSlice } from '@reduxjs/toolkit'

const viewSlice = createSlice({
  name: 'view',
  initialState: 'chats',
  reducers: {
    viewChats() {
      return 'chats'
    },
    viewUsers() {
      return 'users'
    },
    viewGroups() {
      return 'groups'
    }
  }
})

export const { viewChats, viewGroups, viewUsers } = viewSlice.actions
export default viewSlice.reducer
