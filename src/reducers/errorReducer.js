import { createSlice } from '@reduxjs/toolkit'
import parseError from '../utils/parseError'

const errorSlice = createSlice({
  name: 'error',
  initialState: { status: false, msg: '' },
  reducers: {
    newError(state, action) {
      const err = action.payload
      state.status = err.status
      state.msg = err.msg
    },
    clearError(state) {
      state.status = false
      state.msg = ''
    }
  }
})

export const { newError, clearError } = errorSlice.actions
export default errorSlice.reducer


export const setError = (error) => {
  return dispatch => {
    const parsedError = parseError(error)
    dispatch(newError(parsedError))
  }
}