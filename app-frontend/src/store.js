import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import chatReducer from './reducers/chatReducer'
import receiverReducer from './reducers/receiverReducer'
import errorReducer from './reducers/errorReducer'
import themeReducer from './reducers/themeReducer'


const store = configureStore({
  reducer: {
    'user': userReducer,
    'users': usersReducer,
    'chats': chatReducer,
    'receiver': receiverReducer,
    'error': errorReducer,
    'theme': themeReducer
  }
})

export default store