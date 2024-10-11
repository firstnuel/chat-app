import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import chatReducer from './reducers/chatReducer'
import receiverReducer from './reducers/receiverReducer'


const store = configureStore({
  reducer: {
    'user': userReducer,
    'users': usersReducer,
    'chats': chatReducer,
    'receiver': receiverReducer
  }
})

export default store