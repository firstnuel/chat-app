import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const userSlice = createSlice({
  name : 'user',
  initialState : null,
  reducers : {
    setUser(state, action){
      return action.payload
    },
    logOut(){
      window.localStorage.removeItem('loggedChatAppUser')
      return null
    }
  }
})

export const { setUser, logOut } = userSlice.actions
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
    } catch (e) {
      console.error(e)
    }
  }
}
