import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import chatReducer from './reducers/chatReducer'
import receiverReducer from './reducers/receiverReducer'
import errorReducer from './reducers/errorReducer'
import themeReducer from './reducers/themeReducer'
import userChatsReducer from './reducers/userChatsReducer'
import viewReducer from './reducers/viewReducer'


const store = configureStore({
  reducer: {
    'user': userReducer,
    'users': usersReducer,
    'chats': chatReducer,
    'receiver': receiverReducer,
    'error': errorReducer,
    'theme': themeReducer,
    'userChats': userChatsReducer,
    'view': viewReducer
  }
})

export default store