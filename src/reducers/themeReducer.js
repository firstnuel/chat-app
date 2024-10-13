import { createSlice } from '@reduxjs/toolkit'

const initialTheme = localStorage.getItem('theme') || 'dark'

const themeReducer = createSlice({
  name: 'theme',
  initialState: initialTheme,
  reducers: {
    setTheme(state) {
      const newTheme = state === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', newTheme)
      return newTheme
    }
  }
})

export const { setTheme } = themeReducer.actions
export default themeReducer.reducer
