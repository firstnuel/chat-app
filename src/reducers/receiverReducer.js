import { createSlice } from '@reduxjs/toolkit'

const receiverSlice = createSlice({
  name: 'receiver',
  initialState: null,
  reducers: {
    setReceiver(state, action){
      return action.payload
    }
  }
})


export const { setReceiver } = receiverSlice.actions
export default receiverSlice.reducer



