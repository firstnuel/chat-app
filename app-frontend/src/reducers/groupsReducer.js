import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const groupsSlice = createSlice({
  name: 'groups',
  initialState: [],
  reducers: {
    setGroups(state, action){
      return action.payload
    }
  }
})

export const { setGroups } = groupsSlice.actions
export default groupsSlice.reducer

export const fetchGroups = () => {
  return async dispatch => {
    try{
      const groups = await userService.groups()
      dispatch(setGroups(groups))
    } catch (e) {
      console.error
    }
  }
}