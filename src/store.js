import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import chatReducer from './reducers/chatReducer'
import receiverReducer from './reducers/receiverReducer'
import errorReducer from './reducers/errorReducer'
import themeReducer from './reducers/themeReducer'
import userChatsReducer from './reducers/userChatsReducer'
import groupChatReducer from './reducers/groupChatReducer'
import viewReducer from './reducers/viewReducer'
import groupsReducers from './reducers/groupsReducer'


const store = configureStore({
  reducer: {
    'user': userReducer,
    'users': usersReducer,
    'chats': chatReducer,
    'receiver': receiverReducer,
    'error': errorReducer,
    'theme': themeReducer,
    'userChats': userChatsReducer,
    'groupChat': groupChatReducer,
    'groups': groupsReducers,
    'view': viewReducer
  }
})

export default store