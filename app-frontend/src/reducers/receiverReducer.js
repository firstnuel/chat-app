import { createSlice } from '@reduxjs/toolkit'

const receiverSlice = createSlice({
  name: 'receiver',
  initialState: null,
  reducers: {
    setReceiver(state, action){
      return action.payload
    },
    resetReceiver(){
      return null
    }
  }
})


export const { setReceiver, resetReceiver } = receiverSlice.actions
export default receiverSlice.reducer



