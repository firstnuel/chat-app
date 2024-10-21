import { createSlice } from '@reduxjs/toolkit'

const expandSlice = createSlice({
  name: 'expand',
  initialState: true,
  reducers: {
    setExpand(state){
      return !state
    },
    setExpandTrue(){
      return true
    }
  }
})

export const { setExpand, setExpandTrue } = expandSlice.actions
export default expandSlice.reducer