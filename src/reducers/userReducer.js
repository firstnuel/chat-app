import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'
import { setError } from './errorReducer'

const userSlice = createSlice({
  name : 'user',
  initialState : null,
  reducers : {
    setUser(state, action){
      return action.payload
    },
    updatedUser(state, action) {
      return { ...state, ...action.payload }
    },
    logOut(){
      window.localStorage.removeItem('loggedChatAppUser')
      return null
    }
  }
})

export const { setUser, logOut, updatedUser } = userSlice.actions
export default userSlice.reducer

export const fetchAndSetUser = () => {
  return dispatch =>  {
    const loggedUserJSON = window.localStorage.getItem('loggedChatAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export const loginUser = (userData) => {
  return async dispatch => {
    try {
      const user = await userService.login(userData)
      if (user) {
        window.localStorage.setItem('loggedChatAppUser',  JSON.stringify(user))
        userService.setToken(user.token)
        dispatch(setUser(user))
      }
    } catch (err) {
      dispatch(setError(err))
    }
  }
}

export const updateUser = (userdata, userId) => {
  return async dispatch => {
    try {
      const updUser = await userService.updateUser(userdata, userId)
      dispatch(updatedUser(updUser))
    } catch (e) {
      console.error(e)
      dispatch(setError(e))
    }
  }
}