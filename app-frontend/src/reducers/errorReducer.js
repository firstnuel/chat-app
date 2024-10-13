import { createSlice } from '@reduxjs/toolkit'
import parseError from '../utils/parseError'

const errorSlice = createSlice({
  name: 'error',
  initialState: { status: false, msg: '' },
  reducers: {
    setError(state, action) {
      const parsedError = parseError(action.payload)
      state.status = parsedError.status
      state.msg = parsedError.msg
    },
    clearError(state) {
      state.status = false
      state.msg = ''
    }
  }
})

export const { setError, clearError } = errorSlice.actions
export default errorSlice.reducer
