import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const userChatSlice = createSlice({
  name: 'userChats',
  initialState: [],
  reducers: {
    setUserChats(state, action){
      return action.payload
    }
  }
})


export const { setUserChats } = userChatSlice.actions
export default userChatSlice.reducer

export const fetchUsersChats = ( userId ) => {
  return async dispatch => {
    try{
      const userChats = await userService.userChats( userId )
      dispatch(setUserChats(userChats))
    } catch (e) {
      console.error
    }
  }
}