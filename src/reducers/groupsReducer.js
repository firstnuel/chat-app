import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const groupsSlice = createSlice({
  name: 'groups',
  initialState: [],
  reducers: {
    setGroups(state, action){
      return action.payload
    },
    addGroup(state, action){
      const newGroup = action.payload
      return [...state, newGroup]
    },
    rmGroup(state, action){
      const id = action.payload
      return [...state].filter(grp => grp.id !== id)
    }
  }
})

export const { setGroups, addGroup, rmGroup } = groupsSlice.actions
export default groupsSlice.reducer

export const fetchGroups = () => {
  return async dispatch => {
    try{
      const groups = await userService.groups()
      dispatch(setGroups(groups))
    } catch (e) {
      console.error(e)
    }
  }
}

export const deleteGroup = (groupId) => {
  return async (dispatch) => {
    try {
      const deleteStatus = await userService.deleteGroup(groupId)
      if (deleteStatus === 204) {
        dispatch(rmGroup(groupId))
      } else {
        throw new Error('Failed to delete group')
      }
    } catch (e) {
      console.error(e)
    }
  }
}
