import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action){
      return action.payload
    }
  }
})

export const { setUsers } = usersSlice.actions
export default usersSlice.reducer

export const fetchUsers = () => {
  return async dispatch => {
    try{
      const users = await userService.users()
      dispatch(setUsers(users))
    } catch (e) {
      console.error
    }
  }
}